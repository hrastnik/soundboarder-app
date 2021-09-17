import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SoundboardListScreen } from "~/screens/SoundboardListScreen";
import { QueryExample } from "~/screens/QueryExample";
import { DropdownExample } from "~/screens/DropdownExample";
import { FormExample } from "~/screens/FormExample";
import { useStore } from "~/mobx/utils/useStore";
import { Header } from "~/components/Header";
import { CreateSoundboardScreen } from "~/screens/CreateSoundboardScreen";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

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

        <Stack.Screen
          name="DropdownExample"
          component={DropdownExample}
          options={{ title: "DropdownExample" }}
        />

        <Stack.Screen
          name="FormExample"
          component={FormExample}
          options={{ title: "FormExample" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
