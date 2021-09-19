import { useNavigation } from "@react-navigation/core";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React from "react";
import { Alert, ToastAndroid } from "react-native";
import {
  PlayBackType,
  RecordBackType,
} from "react-native-audio-recorder-player";
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
import { useAudioRecorderPlayer } from "./useAudioRecorderPlayer";

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
      currentPhase: "before recording" as
        | "before recording"
        | "recording"
        | "recording error"
        | "recording successful",
      recordingState: { isRecording: false, currentPosition: 0 } as
        | undefined
        | RecordBackType,
      playBackState: {
        currentPosition: 0,
        duration: 0,
        isMuted: false,
      } as PlayBackType,
      recordingName: "",
    };
  });

  const audioRecorderPlayer = useAudioRecorderPlayer();

  async function startRecording() {
    try {
      audioRecorderPlayer.addRecordBackListener(function recordBackListener(
        event
      ) {
        state.recordingState = event;
      });

      audioRecorderPlayer.addPlayBackListener(function playBackListener(event) {
        state.playBackState = event;
      });
      const uri = await audioRecorderPlayer.startRecorder();
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
      const result = await audioRecorderPlayer.stopRecorder();
      console.warn("result", result);
      runInAction(() => {
        state.recordingState = undefined;
        state.currentPhase = "recording successful";
      });
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
      <Text>Playback {JSON.stringify(state.playBackState, null, 2)}</Text>
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
          {audioRecorderPlayer.mmssss(
            state.recordingState?.currentPosition ?? 0
          )}
        </Text>
      )}

      {state.currentPhase === "recording successful" && (
        <>
          <Button
            alignSelfCenter
            title="Play"
            onPress={() => {
              audioRecorderPlayer.startPlayer(state.recordingName);
            }}
          />

          <Spacer />

          <PlayBackProgressBar
            progress={
              state.playBackState?.currentPosition /
              state.playBackState?.duration
            }
          />

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
