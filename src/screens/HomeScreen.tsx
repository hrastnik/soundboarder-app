import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { observer } from "mobx-react";
import React from "react";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { View } from "~/components/View";

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <Screen>
      <View paddingMedium>
        <Button
          title="Query example"
          onPress={() => navigation.navigate("QueryExample")}
        />

        <Spacer />

        <Button
          title="Dropdown example"
          onPress={() => navigation.navigate("DropdownExample")}
        />

        <Spacer />

        <Button
          title="Form example"
          onPress={() => navigation.navigate("FormExample")}
        />
      </View>
    </Screen>
  );
});
