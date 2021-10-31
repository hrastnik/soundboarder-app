import React, { forwardRef, memo, ReactNode } from "react";
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from "react-native";
import { constants as C } from "~/style/constants";
import { Text } from "./Text";
import { View } from "./View";

const S = StyleSheet.create({
  baseStyle: {
    padding: C.spacingMedium,
    margin: 0,
    minHeight: 49,
    backgroundColor: C.colorBackgroundLightDark,
    borderRadius: 4,
    borderColor: C.colorTextTheme,
    borderWidth: StyleSheet.hairlineWidth,
  },
  spacer: { height: 2 },
});

export interface TextInputProps extends RNTextInputProps {
  withoutLabel?: boolean;
  withoutCaption?: boolean;

  sizeExtraSmall?: boolean;
  sizeSmall?: boolean;
  sizeMedium?: boolean;
  sizeLarge?: boolean;
  sizeExtraLarge?: boolean;

  colorTheme?: boolean;
  colorDark?: boolean;
  colorDarkSoft?: boolean;
  colorDarkSofter?: boolean;
  colorLight?: boolean;
  colorLightSoft?: boolean;
  colorLightSofter?: boolean;

  weightLight?: boolean;
  weightRegular?: boolean;
  weightSemiBold?: boolean;
  weightBold?: boolean;
  weightExtraBold?: boolean;

  label?: string;
  isError?: boolean;
  caption?: string;

  children?: ReactNode;
}

export type TextInput = RNTextInput;
export const TextInput = memo(
  forwardRef<RNTextInput, TextInputProps>(function TextInput(
    {
      sizeExtraSmall,
      sizeSmall,
      sizeMedium,
      sizeLarge,
      sizeExtraLarge,

      colorTheme,
      colorDark,
      colorDarkSoft,
      colorDarkSofter,
      colorLight,
      colorLightSoft,
      colorLightSofter,

      weightLight,
      weightRegular,
      weightSemiBold,
      weightBold,
      weightExtraBold,

      style,

      label = " ",
      isError = false,
      caption = " ",

      withoutLabel = false,
      withoutCaption = false,

      ...props
    }: TextInputProps,
    ref
  ) {
    let fontSize: TextStyle["fontSize"] = C.fontSizeMedium;
    if (sizeExtraSmall) fontSize = C.fontSizeExtraSmall;
    else if (sizeSmall) fontSize = C.fontSizeSmall;
    else if (sizeMedium) fontSize = C.fontSizeMedium;
    else if (sizeLarge) fontSize = C.fontSizeLarge;
    else if (sizeExtraLarge) fontSize = C.fontSizeExtraLarge;

    let color: TextStyle["color"] = C.colorTextDark;
    if (colorTheme) color = C.colorTextTheme;
    else if (colorDark) color = C.colorTextDark;
    else if (colorDarkSoft) color = C.colorTextDarkSoft;
    else if (colorDarkSofter) color = C.colorTextDarkSofter;
    else if (colorLight) color = C.colorTextLight;
    else if (colorLightSoft) color = C.colorTextLightSoft;
    else if (colorLightSofter) color = C.colorTextLightSofter;

    let fontWeight: TextStyle["fontWeight"] = C.fontWeightRegular;
    const fontFamily: TextStyle["fontFamily"] = undefined; // "OpenSans-Regular";
    if (weightLight) {
      fontWeight = C.fontWeightLight;
      // fontFamily = "OpenSans-Light";
    } else if (weightRegular) {
      fontWeight = C.fontWeightRegular;
      // fontFamily = "OpenSans-Regular";
    } else if (weightSemiBold) {
      fontWeight = C.fontWeightSemiBold;
      // fontFamily = "OpenSans-SemiBold";
    } else if (weightBold) {
      fontWeight = C.fontWeightBold;
      // fontFamily = "OpenSans-Bold";
    } else if (weightExtraBold) {
      fontWeight = C.fontWeightExtraBold;
      // fontFamily = "OpenSans-ExtraBold";
    }

    const borderColor = isError ? C.colorTextDanger : C.colorTextTheme;
    return (
      <View>
        {!withoutLabel && (
          <>
            <TextInputLabel label={label} />
            <View style={S.spacer} />
          </>
        )}
        <RNTextInput
          ref={ref}
          selectionColor={C.colorBackgroundThemeSofter}
          style={[
            S.baseStyle,
            {
              fontSize,
              color,
              fontWeight,
              fontFamily,
              borderColor,
            },
            style,
          ]}
          {...props}
        />
        {!withoutCaption && (
          <>
            <View style={S.spacer} />
            <TextInputCaption isError={isError} caption={caption} />
          </>
        )}
      </View>
    );
  })
);

export function TextInputLabel({ label }: { label: string }) {
  return (
    <Text sizeSmall weightSemiBold>
      {label}
    </Text>
  );
}

export const TextInputCaption = ({
  isError,
  caption,
}: {
  isError: boolean;
  caption: string;
}) => {
  return (
    <Text sizeExtraSmall colorDanger={isError}>
      {caption}
    </Text>
  );
};
