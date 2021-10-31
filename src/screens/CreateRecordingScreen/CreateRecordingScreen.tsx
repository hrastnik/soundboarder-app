import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Platform } from "react-native";
import { Screen } from "~/components/Screen";
import { PermissionRequestView } from "./PermissionRequestView";
import { Recorder } from "./Recorder";

export const CreateRecordingScreen = observer(function CreateRecordingScreen() {
  const _navigation = useNavigation();

  const [arePermissionAccepted, setArePermissionAccepted] = useState<
    undefined | boolean
  >(Platform.select({ android: undefined, ios: true }));

  return (
    <Screen preventScroll>
      {arePermissionAccepted ? (
        <Recorder />
      ) : (
        <PermissionRequestView
          setArePermissionAccepted={setArePermissionAccepted}
        />
      )}
    </Screen>
  );
});
