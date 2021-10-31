import { Audio, AVPlaybackStatus } from "expo-av";
import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree";

export interface RecordingInstance extends Instance<typeof Recording> {}
export interface RecordingSnapshotIn extends SnapshotIn<typeof Recording> {}
export interface RecordingSnapshotOut extends SnapshotOut<typeof Recording> {}

export const Recording = types
  .model("Recording", {
    uri: types.identifier,

    isPlaying: false,
    durationMillis: types.maybe(types.number),
    positionMillis: types.maybe(types.number),
  })
  .views((self) => {
    return {
      get progress() {
        if (self.positionMillis == null || self.durationMillis == null) {
          return 0;
        }
        return self.positionMillis / self.durationMillis;
      },
    };
  })
  .volatile(() => {
    return {
      audio: undefined as
        | undefined
        | {
            sound: Audio.Sound;
            status: AVPlaybackStatus;
          },
    };
  })
  .actions((self) => {
    return {
      onPlaybackStatusUpdate(status: AVPlaybackStatus) {
        if (status.isLoaded) {
          self.isPlaying = status.isPlaying;
          self.durationMillis = status.durationMillis;
          self.positionMillis = status.positionMillis;
        }
      },
    };
  })
  .actions((self) => {
    return {
      getAudio: flow(function* getAudio(): any {
        if (self.audio) return self.audio;

        console.log("URI", self.uri);

        const audio: {
          sound: Audio.Sound;
          status: AVPlaybackStatus;
        } = yield Audio.Sound.createAsync(
          { uri: self.uri },
          undefined,
          self.onPlaybackStatusUpdate
        );

        self.audio = audio;

        return;
      }),
    };
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
      play: flow(function* play(): any {
        yield self.getAudio();

        if (!self.audio) throw new Error("Audio not ready");

        yield self.audio.sound.replayAsync();
      }),
    };
  });
