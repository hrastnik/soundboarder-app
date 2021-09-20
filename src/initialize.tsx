import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { configure } from "mobx";
import ReactNativeBlobUtil from "react-native-blob-util";
import { createStore } from "~/mobx/createStore";
import { createPersistence } from "./services/createPersistence";
import { createQueryClient } from "./services/createQueryClient";

export async function initialize() {
  configure({ enforceActions: "never" });
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  const fs = ReactNativeBlobUtil.fs;

  const persistence = createPersistence();

  const store = await createStore({ fs, persistence });

  const queryClient = createQueryClient();
  return { store, queryClient };
}
