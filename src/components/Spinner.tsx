import React, { forwardRef } from "react";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

import { constants as C } from "~/style/constants";

const Spinner = forwardRef<ActivityIndicator, ActivityIndicatorProps>(
  function Spinner(
    {
      size = "large",

      color = C.colorBackgroundAccent,

      ...props
    }: ActivityIndicatorProps,
    ref
  ) {
    return <ActivityIndicator ref={ref} size={size} color={color} {...props} />;
  }
);

export { Spinner };
