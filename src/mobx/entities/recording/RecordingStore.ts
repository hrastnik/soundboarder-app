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
  .actions((self) => {
    return {
      process(data: string | string[]): any {
        const env = getEnv(self);
        const dataList = _.castArray(data);
        const mapped = dataList.map((e) => {
          return self.map.put({ uri: `${env.fs.dirs.DocumentDir}/${e}` });
        });
        return Array.isArray(data) ? mapped : mapped[0];
      },
    };
  })
  .actions((self) => {
    return {
      saveRecording: flow<
        RecordingInstance,
        [{ path: string; title: string; soundboard: string }]
      >(function* saveRecording({ path, title, soundboard }): any {
        const env = getEnv(self);

        const destinationUri = `${env.fs.dirs.DocumentDir}/${soundboard}/${title}`;

        console.log({ destinationUri });

        yield env.fs.cp(path, destinationUri);

        return self.process(destinationUri);
      }),

      readRecordingList: flow<RecordingInstance[], [{ soundboard: string }]>(
        function* readRecordingList({ soundboard }): any {
          const env = getEnv(self);
          const fileList: string[] = yield env.fs.ls(
            `${env.fs.dirs.DocumentDir}/${soundboard}`
          );
          const recordingList = fileList
            .filter(
              (fileName) => fileName.endsWith("mp4") || fileName.endsWith("m4a")
            )
            .map((filename) => {
              return `${soundboard}/${filename}`;
            });

          return self.process(recordingList);
        }
      ),

      readSoundboardList: flow<string[], []>(
        function* readSoundboardList(): any {
          const env = getEnv(self);
          const fileList: string[] = yield env.fs.ls(env.fs.dirs.DocumentDir);

          console.log({ fileList });

          const fileDirList: Array<{ path: string; isDir: boolean }> =
            yield Promise.all(
              fileList.map(async (fileOrDir) => {
                return {
                  path: fileOrDir,
                  isDir: await env.fs.isDir(
                    `${env.fs.dirs.DocumentDir}/${fileOrDir}`
                  ),
                };
              })
            );

          const dirList = fileDirList
            .filter((fileOrDir) => fileOrDir.isDir)
            .map((v) => v.path);

          const orderedDirList = _.orderBy(dirList);
          return orderedDirList;
        }
      ),
    };
  });
