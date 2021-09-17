import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import Color from "color";
import { Platform, StatusBar } from "react-native";
import { autorun } from "mobx";

import { constants as C } from "~/style/constants";

export type UIStoreInstance = Instance<typeof UIStore>;
export type UIStoreSnapshotIn = SnapshotIn<typeof UIStore>;
export type UIStoreSnapshotOut = SnapshotOut<typeof UIStore>;

export const UIStore = types
  .model("UIStore", {
    safeAreaBackgroundColor: C.colorBackgroundTheme,
  })
  .actions((self) => ({
    setSafeAreaBackgroundColor(backgroundColor: string) {
      self.safeAreaBackgroundColor = backgroundColor;
    },
  }))
  .actions((self) => {
    return {
      initializeSafeAreaColorWatcher() {
        if (Platform.OS === "android") {
          StatusBar.setTranslucent(true);
          StatusBar.setBackgroundColor("rgba(0,0,0,0)");
        }
        autorun(() => {
          StatusBar.setBarStyle(
            Color(self.safeAreaBackgroundColor).isLight()
              ? "dark-content"
              : "light-content"
          );
        });
      },
    };
  });
