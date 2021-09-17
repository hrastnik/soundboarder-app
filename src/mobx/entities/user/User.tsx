import {
  types,
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from "mobx-state-tree";

import { DateTime } from "~/mobx/util-models/DateTime";
import { getRoot } from "~/mobx/utils/getRoot";

export interface UserInstance extends Instance<typeof User> {}
export interface UserSnapshotIn extends SnapshotIn<typeof User> {}
export interface UserSnapshotOut extends SnapshotOut<typeof User> {}

export const User = types
  .model("User", {
    id: types.identifier,
    name: types.string,
    created_at: DateTime,
    updated_at: DateTime,
  })
  .actions((self) => {
    return {
      refresh: flow(function* (): any {
        const root = getRoot(self);
        return yield root.userStore.readUser(self.id);
      }),
    };
  });
