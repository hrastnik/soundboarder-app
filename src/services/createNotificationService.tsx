import { Platform, Alert } from "react-native";
import OneSignal, { OSNotification } from "react-native-onesignal";
import Permissions, { RESULTS } from "react-native-permissions";

export const notificationPermissionStatuses = {
  GRANTED: "granted",
  DENIED: "denied",
  CHECKING: "checking",
};

export const createNotificationService = () => {
  const handlers: {
    onDeviceId: (deviceId: string) => any;
    onNotification: (notification: OSNotification) => any;
  } = {
    onDeviceId: () => {},
    onNotification: () => {},
  };

  OneSignal.setRequiresUserPrivacyConsent(false);
  OneSignal.setLocationShared(false);

  Permissions.checkNotifications().then(({ status, settings }) => {
    const granted = Platform.select({
      ios:
        status === RESULTS.GRANTED &&
        (settings.alert ||
          settings.notificationCenter ||
          settings.lockScreen ||
          settings.badge ||
          settings.sound),
      android: status === RESULTS.GRANTED,
    });
    return granted
      ? notificationPermissionStatuses.GRANTED
      : notificationPermissionStatuses.DENIED;
  });

  OneSignal.setNotificationOpenedHandler((event) =>
    onOpened(event.notification)
  );
  OneSignal.setNotificationWillShowInForegroundHandler((event) => {
    onReceived(event.getNotification());
    // Decide if you want to show the notification in foreground
    // event.complete()
    // https://documentation.onesignal.com/docs/react-native-40-api-reference#setnotificationwillshowinforegroundhandler-function
  });

  OneSignal.addSubscriptionObserver((event) => {
    if (event.to.userId) handlers.onDeviceId(event.to.userId);
  });

  const initOneSignal = (id: string) => {
    OneSignal.setAppId(id);
  };

  const onReceived = (notification: OSNotification) => {
    handlers.onNotification(notification);
  };

  const onOpened = (notification: OSNotification) => {
    handlers.onNotification(notification);
  };

  const getNotificationPermissions = async () => {
    const granted = await new Promise((resolve) => {
      OneSignal.promptForPushNotificationsWithUserResponse((status) => {
        resolve(status);
      });
    });

    if (granted) return;
    const userResponse = await Permissions.requestNotifications([
      "alert",
      "badge",
    ]);

    if (userResponse.status !== RESULTS.GRANTED) {
      Alert.alert(
        "Warning",
        "Push notifications are required in order to get the best experience",
        [
          {
            text: "Allow in settings",
            onPress: async () => {
              Permissions.openSettings().catch(() =>
                console.warn("cannot open settings")
              );
            },
            style: "cancel",
          },
          {
            text: "Skip",
            onPress: () => {},
          },
        ]
      );
    }
  };

  OneSignal.getDeviceState().then((device) => {
    handlers.onDeviceId(device.userId);
  });

  const setDeviceIdHandler = (handler: (deviceId: string) => any) => {
    handlers.onDeviceId = handler;
  };

  const setNotificationHandler = (
    handler: (notification: OSNotification) => any
  ) => {
    handlers.onNotification = handler;
  };

  const getDeviceId = () =>
    OneSignal.getDeviceState().then((device) => {
      return device.userId;
    });

  return {
    getDeviceId,
    setDeviceIdHandler,
    setNotificationHandler,
    getNotificationPermissions,
    initOneSignal,
    clearHandlers: OneSignal.clearHandlers,
  };
};

export interface NotificationServiceType
  extends ReturnType<typeof createNotificationService> {}
