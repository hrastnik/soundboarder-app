import React from "react";
import { Platform, Image, ImageProps, ImageSourcePropType } from "react-native";
import { colord } from "colord";
import { observer } from "mobx-react";

import { Text, TextProps } from "~/components/Text";
import { View, ViewProps } from "~/components/View";
import { constants as C } from "~/style/constants";

interface AvatarProps {
  source: string | ImageSourcePropType;
  extraSmall?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  extraLarge?: boolean;
  round?: boolean;

  style?: ViewProps["style"] & ImageProps["style"];
}

export const Avatar = observer(
  ({
    source,
    extraSmall,
    small,
    medium,
    large,
    extraLarge,
    round = true,
    style: inheritedStyle,
    ...props
  }: AvatarProps) => {
    const size = extraSmall
      ? 24
      : small
      ? 30
      : medium
      ? 40
      : large
      ? 60
      : extraLarge
      ? 80
      : 40;

    const borderRadius = round ? size * 0.5 : 0;
    const style: ViewProps["style"] & ImageProps["style"] = {
      backgroundColor: C.colorBackgroundTheme,
      width: size,
      height: size,
      borderRadius,
    };

    const textStyle: TextProps["style"] = {
      color: colord(C.colorBackgroundTheme).isDark()
        ? C.colorTextLight
        : C.colorTextDark,
      fontSize: size * 0.6,
      lineHeight: Platform.select({ android: 100, default: 0 }),
    };

    if (typeof source === "string") {
      const firstLetter = source[0] ?? "";
      return (
        <View centerContent style={[style, inheritedStyle]} {...props}>
          <Text style={textStyle}>{firstLetter.toUpperCase()}</Text>
        </View>
      );
    }

    return <Image source={source} style={[style, inheritedStyle]} {...props} />;
  }
);
