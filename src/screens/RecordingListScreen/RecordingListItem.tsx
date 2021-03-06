import dayjs from "dayjs";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { View } from "~/components/View";
import { useAlert } from "~/hooks/useAlert";
import { useDropdown } from "~/hooks/useDropdown";
import { RecordingInstance } from "~/mobx/entities/recording/Recording";
import { constants } from "~/style/constants";
import { promptYesNo } from "~/utils/promptYesNo";
import { shadow } from "~/utils/shadow";

export const RecordingListItem = observer(function RecordingListItem({
  recording,
}: {
  recording: RecordingInstance;
}) {
  const alert = useAlert();
  const client = useQueryClient();
  useEffect(() => {
    recording.getAudio();
  }, [recording]);

  const [shouldGrabName, setShouldGrabName] = useState(false);
  const [name, setName] = useState("");

  const { showDropdown, renderedOptions } = useDropdown({
    optionList: ["Delete", "Rename"],
    selectedIndex: undefined,
    async onSelected(index) {
      if (index === 0) {
        const shouldRemove = await promptYesNo(
          {
            title: "Warning",
            message: "Are your sure you want to delete this recording?",
          },
          alert
        );
        if (!shouldRemove) return;

        await recording.delete();
        await client.refetchQueries(["recordingList"]);
      }
      if (index === 1) {
        setShouldGrabName(true);
      }
    },
  });

  return (
    <>
      <Button
        outline
        onPress={recording.play}
        onLongPress={() => {
          showDropdown();
        }}
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
      {renderedOptions}
      {shouldGrabName && (
        <Modal>
          <View
            flex
            centerContent
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            <View
              style={{ width: "80%", ...shadow(4) }}
              colorLight
              paddingMedium
            >
              <TextInput
                autoFocus
                label="Rename to"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />

              <Spacer extraLarge />

              <Button
                title="Save"
                onPress={async function renameRecording() {
                  await recording.rename(name);
                  await client.refetchQueries(["recordingList"]);
                }}
              />

              <Spacer large />

              <Button
                title="Cancel"
                onPress={() => {
                  setShouldGrabName(false);
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
});
