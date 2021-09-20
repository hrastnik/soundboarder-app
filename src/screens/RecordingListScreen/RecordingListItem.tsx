import dayjs from "dayjs";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { RecordingInstance } from "~/mobx/entities/recording/Recording";
import { constants } from "~/style/constants";
import { PlayBackProgressBar } from "../CreateRecordingScreen/PlayBackProgressBar";

export const RecordingListItem = observer(function RecordingListItem({
  recording,
}: {
  recording: RecordingInstance;
}) {
  useEffect(() => {
    recording.getAudio();
  }, [recording]);
  return (
    <TouchableOpacity paddingSmall flex onPress={recording.play}>
      <View
        colorTheme={recording.isPlaying}
        paddingMedium
        style={{ borderColor: constants.colorTextTheme, borderWidth: 2 }}
      >
        <Text>{recording.basename}</Text>
        <Text>
          {recording.audio?.status.isLoaded
            ? dayjs()
                .startOf("day")
                .add(recording.audio.status.durationMillis ?? 0, "ms")
                .format("mm:ss")
            : "-"}
        </Text>

        <Spacer />

        <PlayBackProgressBar progress={recording.progress} />
      </View>
    </TouchableOpacity>
  );
});
