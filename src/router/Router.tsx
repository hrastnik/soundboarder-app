import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";
import React from "react";
import { Header } from "~/components/Header";
import { useStore } from "~/mobx/utils/useStore";
import { CreateSoundboardScreen } from "~/screens/CreateSoundboardScreen/CreateSoundboardScreen";
import { SoundboardListScreen } from "~/screens/SoundboardListScreen/SoundboardListScreen";
import { TabGroupParams, TopLevelStackParams } from "./RouterTypes";

const Tabs = createBottomTabNavigator<TabGroupParams>();
const Stack = createStackNavigator<TopLevelStackParams>();

function renderTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="SoundboardListScreen"
        component={SoundboardListScreen}
      />
    </Tabs.Navigator>
  );
}

export const Router = observer(function Router() {
  const store = useStore();

  return (
    <NavigationContainer ref={store.navigationStore.setNavigation}>
      <Stack.Navigator
        // initialRouteName="CreateSoundboardScreen"
        screenOptions={{
          headerMode: "screen",
          header(props) {
            return <Header {...props} />;
          },
        }}
      >
        <Stack.Screen name="TabGroup">{renderTabs}</Stack.Screen>

        <Stack.Screen
          name="CreateSoundboardScreen"
          component={CreateSoundboardScreen}
          options={{ title: "CreateSoundboardScreen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
