import dayjs from "dayjs";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Button } from "~/components/Button";
import { Spacer } from "~/components/Spacer";
import { TextInput } from "~/components/TextInput";
import { View } from "~/components/View";

export const SaveRecordingInput = observer(function SaveRecordingInput({
  onSavePress,
}: {
  onSavePress(title: string): any;
}) {
  const [title, setTitle] = useState(
    `recording-${dayjs().format("YYYY-MM-DD-HH-mm-ss")}`
  );
  return (
    <>
      <View flexDirectionRow alignItemsFlexEnd>
        <View flex>
          <TextInput
            autoFocus
            value={title}
            onChangeText={setTitle}
            withoutCaption
            label="Name your recording"
            caption="Hello"
          />
        </View>
        <Spacer large />
        <Button
          paddingHorizontalLarge
          title="Save"
          onPress={() => onSavePress(title)}
        />
      </View>
    </>
  );
});
