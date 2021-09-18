import { useNavigation } from "@react-navigation/native";
import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import AudioRecorderPlayer, {
  PlayBackType,
  RecordBackType,
} from "react-native-audio-recorder-player";
import {
  checkMultiple,
  PERMISSIONS,
  PermissionStatus,
  request,
} from "react-native-permissions";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { NavigationProp } from "~/router/RouterTypes";

const state = observable({
  recordingState: { isRecording: false, currentPosition: 0 } as
    | undefined
    | RecordBackType,
  playBackState: undefined as undefined | PlayBackType,
  recordingName: "",
});

function useAudioRecorderPlayer(): AudioRecorderPlayer {
  const audioRecorderPlayer = useRef<AudioRecorderPlayer | undefined>(
    undefined
  );
  if (!audioRecorderPlayer.current) {
    audioRecorderPlayer.current = new AudioRecorderPlayer();
  }

  return audioRecorderPlayer.current;
}

const permissionState = observable({
  recordAudio: undefined as undefined | PermissionStatus,
  writeExternalStorage: undefined as undefined | PermissionStatus,
  readExternalStorage: undefined as undefined | PermissionStatus,
});
const PermissionRequestView = observer(function PermissionRequestView({
  setArePermissionAccepted: propSetArePermissionsAccepted,
}: {
  setArePermissionAccepted: (value: boolean) => any;
}) {
  useEffect(() => {
    async function requestPermissionsEffect() {
      console.warn("Check multiple");

      const checkResult = await checkMultiple([
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);

      console.warn("Check multiple", checkResult);

      runInAction(() => {
        permissionState.recordAudio =
          checkResult["android.permission.RECORD_AUDIO"];
        permissionState.readExternalStorage =
          checkResult["android.permission.READ_EXTERNAL_STORAGE"];
        permissionState.writeExternalStorage =
          checkResult["android.permission.WRITE_EXTERNAL_STORAGE"];
      });
    }
    requestPermissionsEffect();
  }, []);

  const isAccepted = Object.values(permissionState).every(
    (v) => v === "granted"
  );
  useEffect(() => {
    console.warn(isAccepted);

    if (isAccepted) {
      propSetArePermissionsAccepted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccepted]);

  return (
    <View flex paddingMedium>
      <Button
        title="Request RECORD_AUDIO permission"
        onPress={async () => {
          const requestResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
          permissionState.recordAudio = requestResult;
        }}
      />

      <Button
        title="Request WRITE_EXTERNAL_STORAGE permission"
        onPress={async () => {
          const requestResult = await request(
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
          );
          permissionState.writeExternalStorage = requestResult;
        }}
      />

      <Button
        title="Request READ_EXTERNAL_STORAGE permission"
        onPress={async () => {
          const requestResult = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          );
          permissionState.writeExternalStorage = requestResult;
        }}
      />
    </View>
  );
});

export const CreateSoundboardScreen = observer(
  function CreateSoundboardScreen() {
    const _navigation =
      useNavigation<NavigationProp<"CreateSoundboardScreen">>();

    const [arePermissionAccepted, setArePermissionAccepted] = useState<
      undefined | boolean
    >(undefined);

    return (
      <Screen>
        {arePermissionAccepted ? (
          <Recorder />
        ) : (
          <PermissionRequestView
            setArePermissionAccepted={setArePermissionAccepted}
          />
        )}
      </Screen>
    );
  }
);

const Recorder = observer(function Recorder() {
  const audioRecorderPlayer = useAudioRecorderPlayer();

  console.warn(state.recordingState);

  return (
    <View>
      <Text>Record a sound?</Text>

      <Button
        title={
          state.recordingState?.currentPosition
            ? "Recording"
            : "Start recording"
        }
        onPress={async () => {
          try {
            audioRecorderPlayer.addRecordBackListener(
              function recordBackListener(event) {
                state.recordingState = event;
              }
            );
            const uri = await audioRecorderPlayer.startRecorder();
            state.recordingName = uri;
          } catch (error) {
            Alert.alert("Error");
            console.error(error);
          }
        }}
      />

      <Button
        title={"Recording" + state.recordingName ?? " not in progress"}
        onPress={async () => {
          try {
            const result = await audioRecorderPlayer.stopRecorder();
            console.warn("result", result);
            state.recordingState = undefined;
          } catch (error) {
            Alert.alert("Error");
            console.error(error);
          }
        }}
      />

      <Button
        title="Play"
        onPress={async () => {
          try {
            const result = await audioRecorderPlayer.startPlayer(
              state.recordingName
            );
            console.warn("result", result);

            audioRecorderPlayer.addPlayBackListener(function playBackListener(
              event
            ) {
              state.playBackState = event;
            });
          } catch (error) {
            Alert.alert("Error");
            console.error(error);
          }
        }}
      />

      <Button
        title="Stop"
        onPress={async () => {
          try {
            const response = await audioRecorderPlayer.stopPlayer();
            console.warn("response", response);
            audioRecorderPlayer.removePlayBackListener();
          } catch (error) {
            Alert.alert("Error");
            console.error(error);
          }
        }}
      />
    </View>
  );
});
