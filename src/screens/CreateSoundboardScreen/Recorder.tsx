import { useNavigation } from "@react-navigation/core";
import { Audio } from "expo-av";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import { Button } from "~/components/Button";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { useStore } from "~/mobx/utils/useStore";
import { PlayBackProgressBar } from "./PlayBackProgressBar";
import { SaveRecordingInput } from "./SaveRecordingInput";

function RecordButton(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#bb0000",
        borderWidth: 2,
        borderColor: "#000000",
      }}
      {...props}
    />
  );
}

export const Recorder = observer(function Recorder() {
  const navigation = useNavigation();
  const store = useStore();
  const state = useLocalObservable(() => {
    return {
      durationMillis: 0,
      currentPhase: "before recording" as
        | "before recording"
        | "recording"
        | "recording error"
        | "recording successful",
      recordingName: "",
    };
  });

  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync();

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        function onUpdate(updateState) {
          console.warn("Duration millis", updateState.durationMillis);

          state.durationMillis = updateState.durationMillis;
        },
        100
      );

      // await recording.();

      setRecording(recording);

      const uri = recording.getURI() ?? "unknown";

      runInAction(() => {
        state.recordingName = uri;
        state.currentPhase = "recording";
      });
    } catch (error) {
      Alert.alert("Error");
      console.error(error);
      state.currentPhase = "recording error";
    }
  }

  async function stopRecording() {
    try {
      const result = await recording?.stopAndUnloadAsync();
      console.warn("result", result);
      state.currentPhase = "recording successful";
    } catch (error) {
      Alert.alert("Error");
      console.error(error);
      state.currentPhase = "recording error";
    }
  }

  return (
    <View>
      <Text>Record a sound?</Text>
      <Text>Phase: {state.currentPhase}</Text>
      {/* <Text>Playback {JSON.stringify(state.playBackState, null, 2)}</Text> */}
      {/* <Text>Record a sound? {state.currentPhase}</Text> */}

      {state.currentPhase === "before recording" ||
      state.currentPhase === "recording" ? (
        <View centerContent paddingMedium>
          <RecordButton
            onPress={async () => {
              if (state.currentPhase === "before recording") {
                startRecording();
              } else if (state.currentPhase === "recording") {
                stopRecording();
              }
            }}
          />
        </View>
      ) : (
        <Button
          alignSelfCenter
          title="Reset"
          onPress={() => {
            state.currentPhase = "before recording";
          }}
        />
      )}

      <Spacer />

      {state.currentPhase === "recording" && (
        <Text alignCenter>
          {String(state.durationMillis ?? 0)}
          {/* {audioRecorderPlayer.mmssss(
            store.recordingStore.recordingState?.currentPosition ?? 0
          )} */}
        </Text>
      )}

      {state.currentPhase === "recording successful" && (
        <>
          <Button
            alignSelfCenter
            title="Play"
            onPress={() => {
              console.warn("TODO");

              // recording..startPlayer(state.recordingName);
            }}
          />

          <Spacer />

          <PlayBackProgressBar progress={0.5} />

          <Spacer />

          <View paddingHorizontalMedium>
            <SaveRecordingInput
              onSavePress={async (titleInput) => {
                const extension = state.recordingName.split(".").pop();

                const basename = titleInput
                  ? titleInput
                  : `recording-${Date.now()}`;
                const title = `${basename}.${extension}`;

                store.recordingStore.saveRecording({
                  title,
                  path: state.recordingName,
                });

                navigation.goBack();
                ToastAndroid.show(`Saved ${title}`, ToastAndroid.SHORT);

                // console.log(fileName);
              }}
            />
          </View>
        </>
      )}

      <Spacer />

      {/* <Text>{JSON.stringify(state.recordingState)}</Text> */}
    </View>
  );
});
