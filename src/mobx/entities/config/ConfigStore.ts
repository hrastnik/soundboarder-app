import { AxiosResponse } from "axios";
import {
  SnapshotOut,
  SnapshotIn,
  Instance,
  types,
  flow,
} from "mobx-state-tree";
import { getEnv } from "~/mobx/utils/getEnv";
import { Response } from "~/types/Response";
import { Config, ConfigInstance } from "./Config";

export interface ConfigStoreInstance extends Instance<typeof ConfigStore> {}
export interface ConfigStoreSnapshotIn extends SnapshotIn<typeof ConfigStore> {}
export interface ConfigStoreSnapshotOut
  extends SnapshotOut<typeof ConfigStore> {}

export const ConfigStore = types
  .model("ConfigStore", {
    config: types.maybe(Config),
  })
  .actions((self) => ({
    setConfig(config: any) {
      self.config = config;
      return self.config;
    },
  }))
  .actions((self) => ({
    readConfig: flow<Response<ConfigInstance>, []>(function* readConfig(): any {
      const env = getEnv(self);
      const response: AxiosResponse = yield env.http.get("/config");
      response.data.data = self.setConfig(response.data.data);
      return response.data;
    }),
  }));
