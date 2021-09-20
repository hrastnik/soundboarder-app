import { Audio, AVPlaybackStatus } from "expo-av";
import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree";
import { Await } from "~/mobx/utils/Await";

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
      _audio: undefined as
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
      _setAudio(audio: Await<typeof Audio.Sound.createAsync>) {
        self._audio = audio;

        return self._audio;
      },
    };
  })
  .views((self) => {
    return {
      async audio() {
        if (self._audio) return self._audio;

        const audio = await Audio.Sound.createAsync(
          { uri: self.uri },
          undefined,
          self.onPlaybackStatusUpdate
        );

        return self._setAudio(audio);
      },
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
        const audio: Await<typeof self.audio> = yield self.audio();
        yield audio.sound.replayAsync();
      }),
    };
  });
