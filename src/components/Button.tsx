import _ from "lodash";
import React, { forwardRef, ReactNode, useEffect, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { constants as C } from "~/style/constants";

export interface ButtonProps extends TouchableOpacityProps {
  outline?: boolean;
  title?: string;
  children?: ReactNode;
  onPress?:
    | TouchableOpacityProps["onPress"]
    | ((event: GestureResponderEvent) => Promise<any>);
  isLoading?: boolean;
  setIsLoading?: (isLoading: boolean) => any;
  blockUi?: boolean;
}
export type Button = typeof Button;
export const Button = forwardRef<TouchableOpacity, ButtonProps>(
  (props, ref) => {
    const {
      outline = false,
      title,
      onPress,
      children,
      isLoading: isLoadingProp,
      setIsLoading: setIsLoadingProp,
      disabled,
      style: styleProp,
      ...otherProps
    } = props;

    const isMounted = React.useRef<boolean>(true);
    useEffect(
      () => () => {
        isMounted.current = false;
      },
      []
    );

    const [isLoadingState, setIsLoadingState] = useState(false); //
    const isLoading =
      "isLoading" in otherProps ? isLoadingProp : isLoadingState;
    const setIsLoading =
      ("isLoading" in otherProps ? setIsLoadingProp : setIsLoadingState) ??
      _.noop;

    const handlePress: TouchableOpacityProps["onPress"] = (event) => {
      if (typeof onPress === "function") {
        const maybePromise = onPress(event);

        if (maybePromise && typeof maybePromise.then === "function") {
          setIsLoading(true);
          maybePromise.finally(() => isMounted.current && setIsLoading(false));
        }
      }
    };

    const shouldRenderTitle = typeof title === "string";

    return (
      <>
        <View>
          {!outline && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                transform: [{ translateX: -2 }, { translateY: -6 }],
                height: 52,
                borderRadius: 26,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F9D549",
              }}
            />
          )}
          <TouchableOpacity
            ref={ref}
            style={[
              {
                height: 52,
                borderRadius: 26,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 2,
                borderColor: "#440A68",
              },
              styleProp,
            ]}
            onPress={handlePress}
            disabled={isLoading || disabled}
            {...otherProps}
          >
            {children}
            {Boolean(children && shouldRenderTitle) && <Spacer small />}
            {shouldRenderTitle && (
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  lineHeight: 25,
                  color: "#440A68",
                }}
                numberOfLines={1}
              >
                {title}
              </Text>
            )}

            {isLoading && (
              <View
                centerContent
                style={{ ...StyleSheet.absoluteFillObject, borderRadius: 26 }}
              >
                <Spinner size="small" color={C.colorTextDarkSoft} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {Boolean(isLoading) && (
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
