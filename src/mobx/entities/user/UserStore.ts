import _ from "lodash";
import { AxiosResponse } from "axios";
import {
  types,
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";

import { getEnv } from "~/mobx/utils/getEnv";

import { User } from "./User";

export interface UserStoreInstance extends Instance<typeof UserStore> {}
export interface UserStoreSnapshotIn extends SnapshotIn<typeof UserStore> {}
export interface UserStoreSnapshotOut extends SnapshotOut<typeof UserStore> {}

export const UserStore = types
  .model("UserStore", {
    map: types.map(User),
  })
  .views((self) => ({
    get userList() {
      return self.map.values();
    },
  }))
  .actions((self) => ({
    resetState() {
      self.map.clear();
    },

    process(data: any) {
      const dataList = _.castArray(data);
      const mapped = dataList.map((e) => {
        return self.map.put(e);
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
  }))
  .actions((self) => ({
    readUserList: flow(function* readUserList(params: {
      search?: string;
      page?: number;
      onCancelReady?: () => any;
    }): any {
      const env = getEnv(self);
      const response: AxiosResponse = yield env.http.get("/users", { params });

      self.process(response.data.data);

      return response.data;
    }),

    readUser: flow(function* readUser(id: string): any {
      const env = getEnv(self);
      const response: AxiosResponse = yield env.http.get<boolean, boolean>(
        `/users/${id}`
      );

      self.process(response.data);

      return response.data;
    }),
  }));
