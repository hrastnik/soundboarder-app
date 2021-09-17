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

import { Person, PersonInstance } from "./Person";
import { PaginatedResponse } from "~/types/Response";

export interface PersonStoreInstance extends Instance<typeof PersonStore> {}
export interface PersonStoreSnapshotIn extends SnapshotIn<typeof PersonStore> {}
export interface PersonStoreSnapshotOut
  extends SnapshotOut<typeof PersonStore> {}

export const PersonStore = types
  .model("PersonStore", {
    map: types.map(Person),
  })
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
    readPersonList: flow<PaginatedResponse<PersonInstance>, [{ page: number }]>(
      function* readPersonList(params): any {
        const env = getEnv(self);
        const response: AxiosResponse = yield env.http.get("/people", {
          params,
        });

        response.data.results = self.process(response.data.results);
        return response.data;
      }
    ),
  }));
