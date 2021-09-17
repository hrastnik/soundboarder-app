import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Text } from "~/components/Text";
import { NavigationProp } from "~/router/RouterTypes";

export const SoundboardListScreen = observer(function SoundboardListScreen() {
  const navigation = useNavigation<NavigationProp<"SoundboardListScreen">>();

  const soundboardList: any[] = [];

  const isEmpty = soundboardList.length === 0;

  return (
    <Screen>
      {isEmpty ? (
        <Button
          title="Create your first soundboard"
          onPress={() => {
            navigation.navigate("CreateSoundboardScreen");
          }}
        />
      ) : (
        soundboardList.map((soundboard) => {
          return <SoundboardListItem key={soundboard.id} soundboard />;
        })
      )}
    </Screen>
  );
});

const SoundboardListItem = observer(function SoundboardListItem({
  soundboard: _soundboard,
}: {
  soundboard: any;
}) {
  return <Text>soundboard item placeholder</Text>;
});
