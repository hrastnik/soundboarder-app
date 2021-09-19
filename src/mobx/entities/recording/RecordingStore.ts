import _ from "lodash";
import {
  flow,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree";
import { getEnv } from "~/mobx/utils/getEnv";
import { Recording, RecordingInstance } from "./Recording";

export interface RecordingStoreInstance
  extends Instance<typeof RecordingStore> {}
export interface RecordingStoreSnapshotIn
  extends SnapshotIn<typeof RecordingStore> {}
export interface RecordingStoreSnapshotOut
  extends SnapshotOut<typeof RecordingStore> {}

export const RecordingStore = types
  .model("RecordingStore", {
    map: types.map(Recording),
  })
  .views((self) => ({
    get recordingList() {
      return self.map.values();
    },
  }))
  .actions((self) => ({
    resetState() {
      self.map.clear();
    },

    process(data: string | string[]): any {
      const env = getEnv(self);
      const dataList = _.castArray(data);
      const mapped = dataList.map((e) => {
        return self.map.put({ uri: `${env.fs.dirs.DocumentDir}/${e}` });
      });
      return Array.isArray(data) ? mapped : mapped[0];
    },
  }))
  .actions((self) => ({
    saveRecording: flow<RecordingInstance, [{ path: string; title: string }]>(
      function* saveRecording({ path, title }): any {
        const env = getEnv(self);

        const destinationUri = `${env.fs.dirs.DocumentDir}/${title}`;
        yield env.fs.cp(path, destinationUri);

        return self.process(destinationUri);
      }
    ),

    readRecordingList: flow<RecordingInstance[], []>(
      function* readRecordingList(): any {
        const env = getEnv(self);
        const fileList: string[] = yield env.fs.ls(env.fs.dirs.DocumentDir);
        const recordingList = fileList.filter(
          (fileName) => fileName.endsWith("mp4") || fileName.endsWith("m4a")
        );

        return self.process(recordingList);
      }
    ),
  }));
