import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Platform } from "react-native";
import { Screen } from "~/components/Screen";
import { NavigationProp } from "~/router/RouterTypes";
import { PermissionRequestView } from "./PermissionRequestView";
import { Recorder } from "./Recorder";

export const CreateSoundboardScreen = observer(
  function CreateSoundboardScreen() {
    const _navigation =
      useNavigation<NavigationProp<"CreateSoundboardScreen">>();

    const [arePermissionAccepted, setArePermissionAccepted] = useState<
      undefined | boolean
    >(Platform.select({ android: undefined, ios: true }));

    return (
      <Screen>
        {arePermissionAccepted ? (
          <Recorder />
        ) : (
          <PermissionRequestView
            setArePermissionAccepted={setArePermissionAccepted}
          />
        )}
      </Screen>
    );
  }
);
