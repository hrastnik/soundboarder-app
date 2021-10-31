import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { Audio } from "expo-av";
import { runInAction } from "mobx";
import { observer, useLocalObservable } from "mobx-react";
import React, { useState } from "react";
import { Alert, ToastAndroid } from "react-native";
import { useQueryClient } from "react-query";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { IconButton } from "~/components/IconButton";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { useStore } from "~/mobx/utils/useStore";
import { RouteProp } from "~/router/RouterTypes";
import { constants } from "~/style/constants";
import { SaveRecordingInput } from "./SaveRecordingInput";

export const Recorder = observer(function Recorder() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<"CreateRecordingScreen">>();
  const soundboard = route.params.soundboard;
  const store = useStore();
  const queryClient = useQueryClient();
  const state = useLocalObservable(() => {
    return {
      durationMillis: 0,
      currentPhase: "before recording" as
        | "before recording"
        | "recording"
        | "recording error"
        | "recording successful",
      recordingUri: "",
      error: undefined as undefined | string,
    };
  });

  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );

  async function startRecording() {
    try {
      const { granted } = await Audio.requestPermissionsAsync();

      if (!granted) return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        function onUpdate(updateState) {
          state.durationMillis = updateState.durationMillis;
        },
        100
      );

      // await recording.();

      setRecording(recording);

      const uri = recording.getURI() ?? "unknown";

      runInAction(() => {
        state.recordingUri = uri;
        state.currentPhase = "recording";
        state.error = undefined;
      });
    } catch (error) {
      Alert.alert("Error");
      console.error(error);
      state.currentPhase = "recording error";
    }
  }

  async function stopRecording() {
    try {
      await recording?.stopAndUnloadAsync();
      runInAction(() => {
        state.currentPhase = "recording successful";
        state.error = undefined;
      });
    } catch (error) {
      Alert.alert("Error");
      console.error(error);
      runInAction(() => {
        state.currentPhase = "recording error";
        state.error = String(error);
      });
    }
  }

  const elapsedTime = dayjs()
    .startOf("year")
    .add(state.durationMillis, "ms")
    .format("HH:ss");

  return (
    <View flex>
      <View paddingExtraLarge centerContent>
        <Text alignCenter sizeExtraLarge>
          Record a sound
        </Text>
      </View>

      {state.currentPhase === "before recording" && (
        <>
          <Spacer extraLarge />
          <Spacer extraLarge />
          <Spacer extraLarge />

          <Text alignCenter weightBold style={{ fontSize: 64, lineHeight: 64 }}>
            {elapsedTime}
          </Text>

          <View flex />

          <Button
            title="Start"
            onPress={() => startRecording()}
            flexDirectionRowReverse
          >
            <Icon name="record" size={18} color="#cc0000" />
          </Button>

          <Spacer extraLarge />
        </>
      )}
      {/* <Text>Record a sound? {state.currentPhase}</Text> */}

      {state.currentPhase === "recording" && (
        <>
          <Spacer extraLarge />
          <Spacer extraLarge />
          <Spacer extraLarge />

          <Text alignCenter weightBold style={{ fontSize: 64, lineHeight: 64 }}>
            {elapsedTime}
          </Text>

          <View flex />

          <Button
            title="Start"
            onPress={() => stopRecording()}
            flexDirectionRowReverse
          >
            <Icon name="stop" size={18} color={constants.colorTextDark} />
          </Button>

          <Spacer extraLarge />
        </>
      )}

      {state.currentPhase === "recording successful" && (
        <>
          <Spacer extraLarge />
          <Spacer extraLarge />
          <Spacer extraLarge />

          <View centerContent>
            <IconButton
              alignSelfCenter
              iconName="play-pause"
              iconColor={constants.colorTextDark}
              iconSize={32}
              onPress={() => {
                console.warn("TODO");
              }}
            />
          </View>

          <Spacer extraLarge />
          <Spacer extraLarge />

          <View paddingHorizontalMedium>
            <SaveRecordingInput
              onSavePress={async (titleInput) => {
                const extension = state.recordingUri.split(".").pop();

                const basename = titleInput
                  ? titleInput
                  : `recording-${dayjs().format("YYYY-MM-DD-HH-mm-ss")}`;
                const title = `${basename}.${extension}`;

                store.recordingStore.saveRecording({
                  title,
                  path: state.recordingUri,
                  soundboard,
                });

                queryClient.invalidateQueries(["recordingList"]);

                navigation.goBack();
                ToastAndroid.show(`Saved ${title}`, ToastAndroid.SHORT);

                // console.log(fileName);
              }}
            />

            <Spacer extraLarge />
            <Spacer extraLarge />

            <Button
              style={{ borderColor: "transparent" }}
              outline
              title="Start over"
              onPress={() => {
                state.currentPhase = "before recording";
              }}
            />
          </View>
        </>
      )}

      {state.currentPhase === "recording error" && (
        <View paddingExtraLarge>
          <Text alignCenter>Error!</Text>

          <Spacer large />

          <Text alignCenter>Something bad happened while recording :(</Text>
          <Spacer large />
          <Text sizeSmall>{state.error}</Text>
        </View>
      )}

      <Spacer />

      {/* <Text>{JSON.stringify(state.recordingState)}</Text> */}
    </View>
  );
});
