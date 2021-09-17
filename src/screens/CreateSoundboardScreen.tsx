import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { NavigationProp } from "~/router/RouterTypes";

export const CreateSoundboardScreen = observer(
  function CreateSoundboardScreen() {
    const navigation =
      useNavigation<NavigationProp<"CreateSoundboardScreen">>();

    return (
      <Screen>
        <Text>Record a sound?</Text>
      </Screen>
    );
  }
);
