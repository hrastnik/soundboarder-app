import { observer } from "mobx-react";
import React, { useState } from "react";
import { Button } from "~/components/Button";
import { Spacer } from "~/components/Spacer";
import { TextInput, TextInputLabel } from "~/components/TextInput";
import { View } from "~/components/View";

export const SaveRecordingInput = observer(function SaveRecordingInput({
  onSavePress,
}: {
  onSavePress(title: string): any;
}) {
  const [title, setTitle] = useState("");
  return (
    <>
      <TextInputLabel label="Name your recording" />
      <Spacer small />
      <View flexDirectionRow alignItemsCenter>
        <View flex>
          <TextInput
            value={title}
            onChangeText={setTitle}
            withoutCaption
            withoutLabel
            label="Name your recording"
            caption="Hello"
          />
        </View>
        <Spacer />
        <View>
          <Button title="Save" onPress={() => onSavePress(title)} />
        </View>
      </View>
    </>
  );
});
