import React, { forwardRef } from "react";
import { Button } from "~/components/Button";
import { Icon } from "~/components/Icon";
import { IconProps } from "~/components/Icon";
import { ButtonProps } from "~/components/Button";

export interface IconButtonProps extends ButtonProps {
  iconName: IconProps["name"];
  iconSize?: IconProps["size"];
  iconColor?: IconProps["color"];
  iconStyle?: IconProps["style"];
}

const HIT_SLOP: ButtonProps["hitSlop"] = {
  top: 4,
  right: 4,
  bottom: 4,
  left: 4,
};

export const IconButton = forwardRef<Button, IconButtonProps>(
  ({ iconName, iconSize, iconColor, iconStyle, ...props }, ref: any) => {
    return (
      <Button
        ref={ref}
        hitSlop={HIT_SLOP}
        blockUi={false}
        transparent
        {...props}
      >
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColor}
          style={iconStyle}
        />
      </Button>
    );
  }
);
