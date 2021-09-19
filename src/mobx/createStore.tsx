import AudioRecorderPlayer from "react-native-audio-recorder-player";
import type { ReactNativeBlobUtil } from "react-native-blob-util";
import { RootStore } from "./RootStore";

export interface Environment {
  // persistence: PersistenceStatic;
  // http: HttpStatic;
  fs: ReactNativeBlobUtil["fs"];
  audioRecorderPlayer: AudioRecorderPlayer;
}

export async function createStore(environment: Environment) {
  const rootStore = RootStore.create({}, environment);
  return rootStore;
}
