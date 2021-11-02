import { Audio, AVPlaybackStatus } from "expo-av";
import _ from "lodash";
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
      get extension() {
        const parts = self.filename.split(".");
        if (parts.length >= 2)
          return ("." + self.filename.split(".").pop()) as string;
        return "";
      },

      get basename() {
        const parts = self.filename.split(".");
        if (parts.length >= 2) {
          parts.pop();
          const basename = parts.join(".");
          if (!basename)
            throw new Error("Basename can't be derived from uri: " + self.uri);
          return basename;
        }

        return self.filename;
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
  })
  .actions((self) => {
    return {
      rename: flow<void, [string]>(function* rename(name: string): any {
        const env = getEnv(self);
        const path = _.trimEnd(self.uri, self.filename);
        const newPath = path + name + self.extension;
        yield env.fs.mv(self.uri, newPath);
      }),
    };
  })
  .actions((self) => {
    return {
      delete: flow<void, []>(function* deleteRecording(): any {
        const env = getEnv(self);
        yield env.fs.unlink(self.uri);
      }),
    };
  });
