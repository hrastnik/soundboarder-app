import React from "react";
import { StyleSheet } from "react-native";

import { View } from "~/components/View";
import PropTypes from "prop-types";

import { constants as C } from "~/style/constants";

const S = StyleSheet.create({
  spacingSmall: { width: C.spacingSmall, height: C.spacingSmall },
  spacingMedium: { width: C.spacingMedium, height: C.spacingMedium },
  spacingLarge: { width: C.spacingLarge, height: C.spacingLarge },
  spacingExtraLarge: {
    width: C.spacingExtraLarge,
    height: C.spacingExtraLarge,
  },
});

export interface SpacerProps {
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  extraLarge?: boolean;
}

const Spacer = ({ small, medium, large, extraLarge }: SpacerProps) => {
  let style = S.spacingMedium;
  if (small) style = S.spacingSmall;
  else if (medium) style = S.spacingMedium;
  else if (large) style = S.spacingLarge;
  else if (extraLarge) style = S.spacingExtraLarge;

  return <View style={style} />;
};

Spacer.propTypes = {
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  extraLarge: PropTypes.bool,
};

Spacer.defaultProps = {
  small: false,
  medium: false,
  large: false,
  extraLarge: false,
};

export { Spacer };
