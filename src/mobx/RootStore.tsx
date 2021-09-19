import { Instance, types } from "mobx-state-tree";
import { RecordingStore } from "./entities/recording/RecordingStore";
import { I18n } from "./I18n";
import { NavigationStore } from "./NavigationStore";
import { UIStore } from "./UIStore";

export const RootStore = types.model("RootStore", {
  i18n: types.optional(I18n, {}),
  uiStore: types.optional(UIStore, {}),
  navigationStore: types.optional(NavigationStore, {}),
  recordingStore: types.optional(RecordingStore, {}),
});

export interface RootStoreInstance extends Instance<typeof RootStore> {}
