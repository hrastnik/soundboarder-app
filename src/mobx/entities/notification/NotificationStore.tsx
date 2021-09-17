import _ from "lodash";
import {
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
} from "mobx-state-tree";
import { OSNotification } from "react-native-onesignal";
import { createEffect } from "~/mobx/utils/createEffect";

import { getEnv } from "~/mobx/utils/getEnv";
import { getRoot } from "~/mobx/utils/getRoot";
import { Response } from "~/types/Response";
import { isPrimitive } from "~/utils/isPrimitive";

import { Notification, NotificationInstance } from "./Notification";

export interface NotificationStoreInstance
  extends Instance<typeof NotificationStore> {}
export interface NotificationStoreSnapshotIn
  extends SnapshotIn<typeof NotificationStore> {}
export interface NotificationStoreSnapshotOut
  extends SnapshotOut<typeof NotificationStore> {}

export const NotificationStore = types
  .model("NotificationStore", {
    deviceId: types.maybe(types.string),
    map: types.map(Notification),
  })
  .actions((self) => ({
    resetState() {
      self.map.clear();
    },

    process(data: any) {
      const dataList = _.castArray(data);
      const mapped = dataList.map((entity) => {
        if (isPrimitive(entity)) return entity;
        return self.map.put(entity);
      });

      return Array.isArray(data) ? mapped : mapped[0];
    },

    setDeviceId(deviceId: string) {
      self.deviceId = deviceId;
    },

    deleteNotification(id: string) {
      self.map.delete(id);
    },

    updateDeviceId: flow(function* updateDeviceId(deviceId: string): any {
      const env = getEnv(self);
      const response = yield env.http.put(`/devices`, {
        device_id: deviceId,
      });
      return response.data;
    }),

    removeDeviceId: flow<
      Promise<Response<{ success: boolean }>>,
      [string, string]
    >(function* removeDeviceId(deviceId, token): any {
      const env = getEnv(self);
      const response = yield env.http.delete(`/devices/${deviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }),
  }))
  .actions((self) => {
    // We track all notification listeners (they can be added through useEffect or similar...)
    type NotificationListener = (notification: NotificationInstance) => any;
    const notificationListeners = new Map<
      NotificationListener,
      NotificationListener
    >();

    return {
      onNotification(notification: OSNotification) {
        const notificationInstance = self.process(
          notification
        ) as NotificationInstance;

        for (const listener of notificationListeners.values()) {
          listener(notificationInstance);
        }
      },

      /**
       * Adds a notification handler, and returns a `remove` function so you can clear it later
       * @param handler Function that will receive all future notifications
       */
      addNotificationListener(handler: NotificationListener) {
        notificationListeners.set(handler, handler);

        const remove = () => {
          notificationListeners.delete(handler);
        };

        return remove;
      },
    };
  })
  .actions((self) => {
    return {
      initialize() {
        const env = getEnv(self);
        const root = getRoot(self);
        const configStore = root.configStore;
        const authStore = root.authStore;
        const notificationService = env.notificationService;

        // Here we initialize OneSignal, setup the notification handlers and
        // handle syncing deviceId with the server.
        // This effect will ideally run only once in the lifetime of the app
        // If the app ID changes for some reason then it will re-run, but that
        // scenario is unlikely to happen. Nevertheless, we run this in an effect.
        createEffect(
          () => {
            const appId = configStore.config?.onesignal_app_id;
            if (!appId) return;

            notificationService.initOneSignal(appId);

            notificationService.getDeviceId().then(self.setDeviceId);
            notificationService.setDeviceIdHandler(self.setDeviceId);
            notificationService.setNotificationHandler(self.onNotification);

            const dispose = createEffect(
              () => {
                const isLoggedIn = Boolean(authStore.activeUser);
                const deviceId = self.deviceId;

                if (isLoggedIn && deviceId) {
                  self.updateDeviceId(deviceId);
                  // We can be sure the token exists since activeUser exists
                  const token = authStore.token as string;
                  return () => {
                    self.removeDeviceId(deviceId, token);
                  };
                }
              },
              () => [authStore.activeUser, self.deviceId]
            );

            return () => {
              notificationService.clearHandlers();
              dispose();
            };
          },
          () => configStore.config?.onesignal_app_id
        );
      },
    };
  });
