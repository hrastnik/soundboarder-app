import { observer } from "mobx-react";
import React from "react";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { RecordingInstance } from "~/mobx/entities/recording/Recording";
import { constants } from "~/style/constants";
import { PlayBackProgressBar } from "../CreateSoundboardScreen/PlayBackProgressBar";

export const SoundboardListItem = observer(function SoundboardListItem({
  soundboard,
}: {
  soundboard: RecordingInstance;
}) {
  return (
    <TouchableOpacity paddingSmall flex onPress={soundboard.play}>
      <View
        colorTheme={soundboard.isPlaying}
        paddingMedium
        style={{ borderColor: constants.colorTextTheme, borderWidth: 2 }}
      >
        <Text>{soundboard.basename}</Text>

        <Spacer />

        <PlayBackProgressBar progress={soundboard.progress} />
      </View>
    </TouchableOpacity>
  );
});
