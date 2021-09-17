import React from "react";
import { TouchableOpacity as RNTouchableOpacity } from "react-native";

import { withLayoutProps } from "~/hoc/withLayoutProps";

export const TouchableOpacity = withLayoutProps(RNTouchableOpacity);

export type TouchableOpacity = typeof TouchableOpacity;
export type TouchableOpacityProps = React.ComponentProps<TouchableOpacity>;
