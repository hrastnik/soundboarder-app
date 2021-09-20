import type { ReactNativeBlobUtil } from "react-native-blob-util";
import { RootStore } from "./RootStore";

export interface Environment {
  // persistence: PersistenceStatic;
  // http: HttpStatic;
  fs: ReactNativeBlobUtil["fs"];
}

export async function createStore(environment: Environment) {
  const rootStore = RootStore.create({}, environment);
  return rootStore;
}
