import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { getEnv } from "~/mobx/utils/getEnv";
import { useStore } from "~/mobx/utils/useStore";

export function useAudioRecorderPlayer(): AudioRecorderPlayer {
  const store = useStore();
  const env = getEnv(store);
  return env.audioRecorderPlayer;
}
