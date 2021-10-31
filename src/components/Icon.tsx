import React from "react";
import { TextStyle } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { constants } from "~/style/constants";

export interface IconProps {
  name: string;
  color?: string;
  size?: number;
  style?: TextStyle;
}

export function Icon({
  name,
  color = constants.colorTextLight,
  size = 28,
  ...props
}: IconProps) {
  switch (name) {
    case "chevron-left":
    case "play-arrow":
      return <MaterialIcons name={name} color={color} size={size} {...props} />;

    default:
      return (
        <MaterialCommunityIcons
          name={name}
          color={color}
          size={size}
          {...props}
        />
      );
  }
}
