import { RouteProp as RNRouteProp } from "@react-navigation/native";
import { StackNavigationProp as RNStackNavigationProp } from "@react-navigation/stack";

// --------------------------------------------
// Start navigator params definitions

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends TopLevelStackParams {}
  }
}

// Stack
export type TopLevelStackParams = {
  SoundboardListScreen: undefined;
  CreateRecordingScreen: { soundboard: string };
  RecordingListScreen: { soundboard: string };
  CreateSoundboardScreen: undefined;
};

// End navigator params definitions
// --------------------------------------------

// Navigation prop for screens in Stack
export type TopLevelStackNavigationProp =
  RNStackNavigationProp<TopLevelStackParams>;

export type ScreenName = keyof TopLevelStackParams;

export type NavigationProp = TopLevelStackNavigationProp;

export type RouteProp<ScreenName_ extends ScreenName> = RNRouteProp<
  TopLevelStackParams,
  ScreenName_
>;
