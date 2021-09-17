import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { observer } from "mobx-react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "~/screens/HomeScreen";
import { QueryExample } from "~/screens/QueryExample";
import { DropdownExample } from "~/screens/DropdownExample";
import { FormExample } from "~/screens/FormExample";
import { useStore } from "~/mobx/utils/useStore";
import { Header } from "~/components/Header";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export interface RouterProps {}

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
        <Stack.Screen name="Tabs">
          {() => {
            return (
              <Tabs.Navigator>
                <Tabs.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ title: "HomeScreen" }}
                />
              </Tabs.Navigator>
            );
          }}
        </Stack.Screen>

        <Stack.Screen
          name="QueryExample"
          component={QueryExample}
          options={{ title: "QueryExample" }}
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
