import { StackNavigationProp as RNStackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp as RNBottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
  RouteProp as RNRouteProp,
} from "@react-navigation/native";

// --------------------------------------------
// Start navigator params definitions

// declare global {
//   // eslint-disable-next-line @typescript-eslint/no-namespace
//   namespace ReactNavigation {
//     interface RootParamList extends TopLevelStackParams {}
//   }
// }

// Stack  >  Tabs
export type TabGroupParams = {
  SoundboardListScreen: undefined;
  CreateSoundboardScreen: undefined;
};

// Stack
export type TopLevelStackParams = {
  TabGroup: NavigatorScreenParams<TabGroupParams>;
  CreateSoundboardScreen: undefined;
};

// End navigator params definitions
// --------------------------------------------

// Navigation prop for screens in Stack
export type TopLevelStackNavigationProp =
  RNStackNavigationProp<TopLevelStackParams>;

// Navigation prop for screens in Stack > Tabs
export type TabsNavigationProp<T extends keyof TabGroupParams> =
  CompositeNavigationProp<
    RNBottomTabNavigationProp<TabGroupParams, T>,
    TopLevelStackNavigationProp
  >;

export type ScreenName = keyof TopLevelStackParams | keyof TabGroupParams;

export type NavigationProp<ScreenName_ extends ScreenName> =
  ScreenName_ extends keyof TopLevelStackParams
    ? TopLevelStackNavigationProp
    : ScreenName_ extends keyof TabGroupParams
    ? TabsNavigationProp<ScreenName_>
    : never;

export type RouteProp<ScreenName_ extends ScreenName> =
  ScreenName_ extends keyof TopLevelStackParams
    ? RNRouteProp<TopLevelStackParams, ScreenName_>
    : ScreenName_ extends keyof TabGroupParams
    ? RNRouteProp<TabGroupParams, ScreenName_>
    : never;
