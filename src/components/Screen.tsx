import React, { ReactNode } from "react";
import {
  StyleSheet,
  ScrollView,
  ScrollViewProps,
  ViewProps,
} from "react-native";

import { View } from "~/components/View";

import { constants as C } from "~/style/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const S = StyleSheet.create({
  base: { backgroundColor: C.colorBackgroundLight, flex: 1 },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: C.colorBackgroundLight,
  },
});

export type ScreenProps = (
  | ({ preventScroll?: true } & ViewProps)
  | ({ preventScroll?: false } & ScrollViewProps)
) & {
  children: ReactNode;
  colorBackgroundTheme?: boolean;
  colorBackgroundAccent?: boolean;
  colorBackgroundLight?: boolean;
  colorBackgroundDark?: boolean;
  colorBackgroundDanger?: boolean;
  colorBackgroundThemeSoft?: boolean;
  colorBackgroundThemeSofter?: boolean;
  colorBackgroundThemeHard?: boolean;
  colorBackgroundThemeHarder?: boolean;
  colorBackgroundLightDark?: boolean;
  colorBackgroundLightDarker?: boolean;
  colorBackgroundDarkLight?: boolean;
  colorBackgroundDarkLighter?: boolean;
  withoutBottomTabBar?: boolean;
  withoutHeader?: boolean;
};

export const Screen = React.forwardRef<ScrollView | View, ScreenProps>(
  ({ preventScroll = false, style, ...props }, ref) => {
    const insets = useSafeAreaInsets();
    const insetBottom = insets.bottom;
    const insetTop = insets.top;

    const resolveBackgroundColor = () => {
      if (props.colorBackgroundTheme) return C.colorBackgroundTheme;
      if (props.colorBackgroundAccent) return C.colorBackgroundAccent;
      if (props.colorBackgroundLight) return C.colorBackgroundLight;
      if (props.colorBackgroundDark) return C.colorBackgroundDark;
      if (props.colorBackgroundDanger) return C.colorBackgroundDanger;
      if (props.colorBackgroundThemeSoft) return C.colorBackgroundThemeSoft;
      if (props.colorBackgroundThemeSofter) return C.colorBackgroundThemeSofter;
      if (props.colorBackgroundThemeHard) return C.colorBackgroundThemeHard;
      if (props.colorBackgroundThemeHarder) return C.colorBackgroundThemeHarder;
      if (props.colorBackgroundLightDark) return C.colorBackgroundLightDark;
      if (props.colorBackgroundLightDarker) return C.colorBackgroundLightDarker;
      if (props.colorBackgroundDarkLight) return C.colorBackgroundDarkLight;
      if (props.colorBackgroundDarkLighter) return C.colorBackgroundDarkLighter;
      return C.colorBackgroundLight;
    };

    const resolvePaddingBottom = () => {
      if (props.withoutBottomTabBar) return insetBottom;
      return undefined;
    };

    const resolvePaddingTop = () => {
      if (props.withoutHeader) return insetTop;
      return undefined;
    };

    const backgroundColor = resolveBackgroundColor();
    const paddingBottom = resolvePaddingBottom();
    const paddingTop = resolvePaddingTop();

    let renderedContent;
    if (preventScroll) {
      const screenStyle = [
        S.base,
        { backgroundColor, paddingBottom, paddingTop },
        style,
      ];
      renderedContent = (
        <View ref={ref as React.Ref<View>} style={screenStyle} {...props} />
      );
    } else {
      const screenStyle = [S.base, { backgroundColor }, style];
      const contentContainerStyle = [
        S.contentContainer,
        { backgroundColor, paddingBottom, paddingTop },
      ];

      renderedContent = (
        <ScrollView
          ref={ref as React.Ref<ScrollView>}
          style={screenStyle}
          contentContainerStyle={contentContainerStyle}
          keyboardShouldPersistTaps="handled"
          {...props}
        />
      );
    }

    return renderedContent;
  }
);

export type Screen = typeof Screen;
