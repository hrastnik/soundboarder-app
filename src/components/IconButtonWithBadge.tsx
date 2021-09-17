import React from "react";

import { Text } from "~/components/Text";
import { View, ViewProps } from "~/components/View";

import { constants as C } from "~/style/constants";
import { IconButton, IconButtonProps } from "./IconButton";

export interface IconButtonWithBadgeProps extends IconButtonProps {
  count?: number;
  shouldShowBadge: boolean;
}

export function IconButtonWithBadge({
  iconSize = 28,
  iconColor = C.colorTextLight,
  iconName,
  shouldShowBadge,
  count,
  onPress,
}: IconButtonWithBadgeProps) {
  const badgeSize = iconSize * 0.4;
  const badgeRadius = badgeSize * 0.5;
  const badgeStyle: ViewProps["style"] = {
    position: "absolute",
    width: badgeSize,
    height: badgeSize,
    backgroundColor: C.colorTextDanger,
    borderRadius: badgeRadius,
    right: iconSize * 0.1,
    top: iconSize * 0.1,
  };

  const shouldShowCount = typeof count === "number";

  return (
    <View>
      <IconButton
        iconSize={iconSize}
        iconColor={iconColor}
        iconName={iconName}
        onPress={onPress}
      />
      {shouldShowBadge && (
        <View centerContent style={badgeStyle}>
          {shouldShowCount && (
            <Text colorLight weightBold sizeExtraSmall>
              {count}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
