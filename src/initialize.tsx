import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { configure } from "mobx";
import ReactNativeBlobUtil from "react-native-blob-util";
import { createStore } from "~/mobx/createStore";
import { createQueryClient } from "./services/createQueryClient";
import AudioRecorderPlayer from "react-native-audio-recorder-player";

export async function initialize() {
  configure({ enforceActions: "never" });
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);
  const fs = ReactNativeBlobUtil.fs;

  const audioRecorderPlayer = new AudioRecorderPlayer();
  audioRecorderPlayer.setSubscriptionDuration(0.1);

  const store = await createStore({ fs, audioRecorderPlayer });

  const queryClient = createQueryClient();
  return { store, queryClient };
}
