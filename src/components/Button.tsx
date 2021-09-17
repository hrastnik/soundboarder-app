import React, { ReactNode, useState, forwardRef, useEffect } from "react";
import { TextStyle, StyleSheet, TouchableWithoutFeedback } from "react-native";

import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "~/components/TouchableOpacity";
import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { shadow } from "~/utils/shadow";

import { constants as C } from "~/style/constants";

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  small?: boolean;
  outline?: boolean;
  transparent?: boolean;
  colorDanger?: boolean;
  colorTheme?: boolean;
  colorAccent?: boolean;
  children?: ReactNode;
  onPress?:
    | TouchableOpacityProps["onPress"]
    | ((...args: any[]) => Promise<any>);
  blockUi?: boolean;
}
export type Button = typeof Button;
export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (
    {
      title,

      small = false,
      outline = false,
      transparent = false,
      colorDanger = false,
      colorTheme = false,
      colorAccent = false,

      style: inheritedStyle,
      disabled,
      children,
      onPress,
      blockUi = true,
      ...props
    },
    ref
  ) => {
    const isMounted = React.useRef<boolean>(true);
    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    const shouldRenderTitle = typeof title === "string";

    const resolveBackgroundColor = () => {
      if (outline) return "transparent";
      if (transparent) return "transparent";

      if (colorDanger) return C.colorBackgroundDanger;
      else if (colorTheme) return C.colorBackgroundTheme;
      else if (colorAccent) return C.colorBackgroundAccent;

      return C.colorBackgroundTheme;
    };

    const resolvePadding = () => {
      if (small) return C.spacingSmall;
      return C.spacingMedium;
    };

    const resolveTextStyle = () => {
      const style: TextStyle = {};
      if (small) style.fontSize = C.fontSizeSmall;
      else style.fontSize = C.fontSizeMedium;

      if (outline || transparent) {
        if (colorDanger) style.color = C.colorTextDanger;
        else if (colorTheme) style.color = C.colorTextTheme;
        else if (colorAccent) style.color = C.colorTextAccent;
        else style.color = C.colorTextTheme;
      } else {
        style.color = C.colorTextLight;
      }

      return style;
    };

    const resolveBorderColor = () => {
      if (outline) return resolveTextStyle().color;
      if (transparent) return "transparent";
      if (colorDanger) return C.colorBackgroundDanger;
      if (colorTheme) return C.colorBackgroundTheme;
      if (colorAccent) return C.colorBackgroundAccent;
      return C.colorBackgroundTheme;
    };

    const resolveShadow = () => {
      return 0;
    };

    const [isLoading, setIsLoading] = useState(false);

    const borderRadius = 8; // shared between the button and the spinner overlay
    const style: TouchableOpacityProps["style"] = {
      flexDirection: "row",
      justifyContent: "center", // ideja kod dodavanja ikona -> children != null ? "flex-start" : "center"
      alignItems: "center",
      backgroundColor: resolveBackgroundColor(),
      borderColor: resolveBorderColor(),
      borderWidth: 1,
      padding: resolvePadding(),
      borderRadius,
      ...shadow(resolveShadow()),
      opacity: isLoading || disabled ? 0.5 : 1,
    };

    const textStyle = resolveTextStyle();

    return (
      <>
        <TouchableOpacity
          ref={ref}
          style={[style, inheritedStyle]}
          onPress={(event) => {
            if (typeof onPress === "function") {
              const maybePromise = onPress(event);

              if (maybePromise && typeof maybePromise.then === "function") {
                setIsLoading(true);
                maybePromise.finally(
                  () => isMounted.current && setIsLoading(false)
                );
              }
            }
          }}
          disabled={isLoading || disabled}
          {...props}
        >
          <>
            {children}
            {Boolean(children && shouldRenderTitle) && <Spacer small />}
            {shouldRenderTitle && (
              <Text numberOfLines={1} style={textStyle}>
                {title}
              </Text>
            )}
          </>
          {isLoading && (
            <View
              centerContent
              style={{ ...StyleSheet.absoluteFillObject, borderRadius }}
            >
              <Spinner size="small" color={C.colorTextDarkSoft} />
            </View>
          )}
        </TouchableOpacity>

        {Boolean(blockUi && isLoading) && (
          <Modal blockHardwareBackButton>
            <TouchableWithoutFeedback>
              <View flex />
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </>
    );
  }
);
