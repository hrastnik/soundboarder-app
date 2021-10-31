import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";
import React from "react";
import { Header } from "~/components/Header";
import { useStore } from "~/mobx/utils/useStore";
import { CreateRecordingScreen } from "~/screens/CreateRecordingScreen/CreateRecordingScreen";
import { RecordingListScreen } from "~/screens/RecordingListScreen/RecordingListScreen";
import { CreateSoundboardScreen } from "~/screens/SoundboardListScreen/CreateSoundboardScreen";
import { SoundboardListScreen } from "~/screens/SoundboardListScreen/SoundboardListScreen";
import { TopLevelStackParams } from "./RouterTypes";

const Stack = createStackNavigator<TopLevelStackParams>();

export const Router = observer(function Router() {
  const store = useStore();

  return (
    <NavigationContainer ref={store.navigationStore.setNavigation}>
      <Stack.Navigator
        // initialRouteName="CreateRecordingScreen"
        screenOptions={{
          headerMode: "screen",
          header(props) {
            return <Header {...props} />;
          },
        }}
      >
        <Stack.Screen
          name="SoundboardListScreen"
          component={SoundboardListScreen}
          options={{ title: "Soundboards" }}
        />

        <Stack.Screen
          name="CreateRecordingScreen"
          component={CreateRecordingScreen}
          options={{ title: "Sound creator" }}
        />

        <Stack.Screen
          name="RecordingListScreen"
          component={RecordingListScreen}
          options={{ title: "Recordings" }}
        />

        <Stack.Screen
          name="CreateSoundboardScreen"
          component={CreateSoundboardScreen}
          options={{ title: "Create a soundboard" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
