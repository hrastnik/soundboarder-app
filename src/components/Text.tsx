import React from "react";
import { Text as RNText } from "react-native";

import { withTextProps } from "~/hoc/withTextProps";

export const Text = withTextProps(RNText);
export type Text = typeof Text;
export type TextProps = React.ComponentProps<Text>;
