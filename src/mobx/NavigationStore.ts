import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { NavigationContainerRef } from "@react-navigation/core";

export type NavigationStoreInstance = Instance<typeof NavigationStore>;
export type NavigationStoreSnapshotIn = SnapshotIn<typeof NavigationStore>;
export type NavigationStoreSnapshotOut = SnapshotOut<typeof NavigationStore>;

export const NavigationStore = types
  .model("NavigationStore", {})
  .volatile(() => {
    return {
      /**
       * @private Use `navigation` without underscore instead
       */
      _navigation: undefined as undefined | NavigationContainerRef<any>,
    };
  })
  .actions((self) => {
    return {
      setNavigation(navigation: NavigationContainerRef<any> | null) {
        if (navigation) {
          self._navigation = navigation;
        }
      },
    };
  })
  .views((self) => {
    return {
      get navigation() {
        if (!self._navigation) {
          throw new Error(
            "Accessing navigation from store before ref is ready"
          );
        }
        return self._navigation;
      },
    };
  });
