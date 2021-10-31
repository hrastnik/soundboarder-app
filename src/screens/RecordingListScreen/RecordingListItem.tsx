import dayjs from "dayjs";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { RecordingInstance } from "~/mobx/entities/recording/Recording";
import { constants } from "~/style/constants";

export const RecordingListItem = observer(function RecordingListItem({
  recording,
}: {
  recording: RecordingInstance;
}) {
  useEffect(() => {
    recording.getAudio();
  }, [recording]);

  return (
    <Button
      outline
      onPress={recording.play}
      colorTheme={recording.isPlaying}
      title={recording.basename}
      flexDirectionRowReverse
      paddingHorizontalLarge
    >
      <Icon size={18} name="play" color={constants.colorTextDark} />

      <Spacer large />

      <Text>
        {recording.audio?.status.isLoaded
          ? dayjs()
              .startOf("day")
              .add(recording.audio.status.durationMillis ?? 0, "ms")
              .format("mm:ss")
          : "-"}
      </Text>

      <View flex />
    </Button>
  );
  return (
    <TouchableOpacity paddingSmall flex onPress={recording.play}>
      <View
        colorTheme={recording.isPlaying}
        paddingLarge
        style={{
          borderColor: constants.colorTextTheme,
          borderWidth: 2,
          borderRadius: 16,
        }}
      >
        <View flexDirectionRow alignItemsCenter>
          <Text>{recording.basename}</Text>

          <View flex />
        </View>
      </View>
    </TouchableOpacity>
  );
});
