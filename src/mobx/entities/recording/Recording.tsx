import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree";
import { getEnv } from "~/mobx/utils/getEnv";

export interface RecordingInstance extends Instance<typeof Recording> {}
export interface RecordingSnapshotIn extends SnapshotIn<typeof Recording> {}
export interface RecordingSnapshotOut extends SnapshotOut<typeof Recording> {}

export const Recording = types
  .model("Recording", {
    uri: types.identifier,
  })
  .views((self) => {
    return {
      get filename() {
        const filename = self.uri.split("/").pop();
        if (!filename)
          throw new Error("Filename can't be derived from uri: " + self.uri);
        return filename;
      },
    };
  })
  .views((self) => {
    return {
      get basename() {
        const parts = self.filename.split(".");
        parts.pop();
        const basename = parts.join(".");

        if (!basename)
          throw new Error("Basename can't be derived from uri: " + self.uri);

        return basename;
      },
    };
  })
  .views((self) => {
    return {
      get basename() {
        const parts = self.filename.split(".");
        parts.pop();
        const basename = parts.join(".");

        if (!basename)
          throw new Error("Basename can't be derived from uri: " + self.uri);

        return basename;
      },
    };
  })
  .actions((self) => {
    return {
      play: flow(function* (): any {
        const env = getEnv(self);
        return yield env.audioRecorderPlayer.startPlayer(self.uri);
      }),
    };
  });
