import React from "react";
import { View as RNView } from "react-native";

import { withLayoutProps } from "~/hoc/withLayoutProps";

export const View = withLayoutProps(RNView);
export type View = typeof View;
export type ViewProps = React.ComponentProps<View>;
