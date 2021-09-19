import React, { ReactNode, forwardRef } from "react";
import { ViewStyle } from "react-native";

import { constants as C, constants } from "~/style/constants";

export interface WithLayoutProps {
  aspectRatioOne?: boolean;

  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingSmall?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingMedium?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingLarge?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingExtraLarge?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingHorizontalSmall?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingHorizontalMedium?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingHorizontalLarge?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingHorizontalExtraLarge?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingVerticalSmall?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingVerticalMedium?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingVerticalLarge?: boolean;
  /** paddingSmall=8 paddingMedium=16 paddingLarge=24 paddingExtraLarge=32  */
  paddingVerticalExtraLarge?: boolean;
  centerContent?: boolean;

  colorLight?: boolean;
  colorLightDark?: boolean;
  colorLightDarker?: boolean;
  colorDarkLighter?: boolean;
  colorDarkLight?: boolean;
  colorDark?: boolean;
  colorThemeSofter?: boolean;
  colorThemeSoft?: boolean;
  colorTheme?: boolean;
  colorThemeHard?: boolean;
  colorThemeHarder?: boolean;

  justifyContentCenter?: boolean;
  justifyContentFlexStart?: boolean;
  justifyContentFlexEnd?: boolean;
  justifyContentSpaceBetween?: boolean;
  justifyContentSpaceAround?: boolean;
  justifyContentSpaceEvenly?: boolean;

  alignItemsFlexStart?: boolean;
  alignItemsFlexEnd?: boolean;
  alignItemsCenter?: boolean;
  alignItemsStretch?: boolean;
  alignItemsBaseline?: boolean;

  alignSelfFlexStart?: boolean;
  alignSelfFlexEnd?: boolean;
  alignSelfCenter?: boolean;
  alignSelfStretch?: boolean;
  alignSelfBaseline?: boolean;

  flex?: boolean | number;
  flexDirectionRow?: boolean;
  flexDirectionColumn?: boolean;
  flexDirectionRowReverse?: boolean;
  flexDirectionColumnReverse?: boolean;

  absoluteTopLeft?: boolean;
  absoluteTopLeftSmall?: boolean;
  absoluteTopLeftMedium?: boolean;
  absoluteTopLeftLarge?: boolean;
  absoluteTopLeftExtraLarge?: boolean;

  absoluteTopRight?: boolean;
  absoluteTopRightSmall?: boolean;
  absoluteTopRightMedium?: boolean;
  absoluteTopRightLarge?: boolean;
  absoluteTopRightExtraLarge?: boolean;

  absoluteBottomLeft?: boolean;
  absoluteBottomLeftSmall?: boolean;
  absoluteBottomLeftMedium?: boolean;
  absoluteBottomLeftLarge?: boolean;
  absoluteBottomLeftExtraLarge?: boolean;

  absoluteBottomRight?: boolean;
  absoluteBottomRightSmall?: boolean;
  absoluteBottomRightMedium?: boolean;
  absoluteBottomRightLarge?: boolean;
  absoluteBottomRightExtraLarge?: boolean;

  invertX?: boolean;
  invertY?: boolean;

  children?: ReactNode;
}

export function withLayoutProps<Props extends { style?: any }>(
  Component: React.ComponentType<Props>
) {
  type NewProps = Omit<Props, keyof WithLayoutProps> & WithLayoutProps;
  return forwardRef<typeof Component, NewProps>(
    (
      {
        colorLight,
        colorLightDark,
        colorLightDarker,
        colorDarkLighter,
        colorDarkLight,
        colorDark,
        colorThemeSofter,
        colorThemeSoft,
        colorTheme,
        colorThemeHard,
        colorThemeHarder,

        paddingSmall,
        paddingMedium,
        paddingLarge,
        paddingExtraLarge,

        paddingHorizontalSmall,
        paddingHorizontalMedium,
        paddingHorizontalLarge,
        paddingHorizontalExtraLarge,

        paddingVerticalSmall,
        paddingVerticalMedium,
        paddingVerticalLarge,
        paddingVerticalExtraLarge,

        centerContent,

        justifyContentCenter,
        justifyContentFlexStart,
        justifyContentFlexEnd,
        justifyContentSpaceBetween,
        justifyContentSpaceAround,
        justifyContentSpaceEvenly,

        alignItemsFlexStart,
        alignItemsFlexEnd,
        alignItemsCenter,
        alignItemsStretch,
        alignItemsBaseline,

        alignSelfFlexStart,
        alignSelfFlexEnd,
        alignSelfCenter,
        alignSelfStretch,
        alignSelfBaseline,

        flexDirectionRow,
        flexDirectionColumn,
        flexDirectionRowReverse,
        flexDirectionColumnReverse,

        absoluteTopLeft,
        absoluteTopLeftSmall,
        absoluteTopLeftMedium,
        absoluteTopLeftLarge,
        absoluteTopLeftExtraLarge,
        absoluteTopRight,
        absoluteTopRightSmall,
        absoluteTopRightMedium,
        absoluteTopRightLarge,
        absoluteTopRightExtraLarge,
        absoluteBottomLeft,
        absoluteBottomLeftSmall,
        absoluteBottomLeftMedium,
        absoluteBottomLeftLarge,
        absoluteBottomLeftExtraLarge,
        absoluteBottomRight,
        absoluteBottomRightSmall,
        absoluteBottomRightMedium,
        absoluteBottomRightLarge,
        absoluteBottomRightExtraLarge,

        flex,
        aspectRatioOne,
        invertX,
        invertY,
        style: passThroughStyle,
        ...passThroughProps
      },
      ref
    ) => {
      const style: ViewStyle = {};

      if (colorLight) style.backgroundColor = constants.colorBackgroundLight;
      if (colorLightDark)
        style.backgroundColor = constants.colorBackgroundLightDark;
      if (colorLightDarker)
        style.backgroundColor = constants.colorBackgroundLightDarker;
      if (colorDarkLighter)
        style.backgroundColor = constants.colorBackgroundDarkLighter;
      if (colorDarkLight)
        style.backgroundColor = constants.colorBackgroundDarkLight;
      if (colorDark) style.backgroundColor = constants.colorBackgroundDark;
      if (colorThemeSofter)
        style.backgroundColor = constants.colorBackgroundThemeSofter;
      if (colorThemeSoft)
        style.backgroundColor = constants.colorBackgroundThemeSoft;
      if (colorTheme) style.backgroundColor = constants.colorBackgroundTheme;
      if (colorThemeHard)
        style.backgroundColor = constants.colorBackgroundThemeHard;
      if (colorThemeHarder)
        style.backgroundColor = constants.colorBackgroundThemeHarder;

      if (paddingSmall) style.padding = C.spacingSmall;
      if (paddingMedium) style.padding = C.spacingMedium;
      if (paddingLarge) style.padding = C.spacingLarge;
      if (paddingExtraLarge) style.padding = C.spacingExtraLarge;

      if (paddingHorizontalSmall) style.paddingHorizontal = C.spacingSmall;
      if (paddingHorizontalMedium) style.paddingHorizontal = C.spacingMedium;
      if (paddingHorizontalLarge) style.paddingHorizontal = C.spacingLarge;
      if (paddingHorizontalExtraLarge)
        style.paddingHorizontal = C.spacingExtraLarge;

      if (paddingVerticalSmall) style.paddingVertical = C.spacingSmall;
      if (paddingVerticalMedium) style.paddingVertical = C.spacingMedium;
      if (paddingVerticalLarge) style.paddingVertical = C.spacingLarge;
      if (paddingVerticalExtraLarge)
        style.paddingVertical = C.spacingExtraLarge;

      if (centerContent) {
        style.justifyContent = "center";
        style.alignItems = "center";
      }
      if (justifyContentCenter) style.justifyContent = "center";
      if (justifyContentFlexStart) style.justifyContent = "flex-start";
      if (justifyContentFlexEnd) style.justifyContent = "flex-end";
      if (justifyContentSpaceBetween) style.justifyContent = "space-between";
      if (justifyContentSpaceAround) style.justifyContent = "space-around";
      if (justifyContentSpaceEvenly) style.justifyContent = "space-evenly";

      if (alignItemsFlexStart) style.alignItems = "flex-start";
      if (alignItemsFlexEnd) style.alignItems = "flex-end";
      if (alignItemsCenter) style.alignItems = "center";
      if (alignItemsStretch) style.alignItems = "stretch";
      if (alignItemsBaseline) style.alignItems = "baseline";

      if (alignSelfFlexStart) style.alignSelf = "flex-start";
      if (alignSelfFlexEnd) style.alignSelf = "flex-end";
      if (alignSelfCenter) style.alignSelf = "center";
      if (alignSelfStretch) style.alignSelf = "stretch";
      if (alignSelfBaseline) style.alignSelf = "baseline";

      if (flexDirectionRow) style.flexDirection = "row";
      if (flexDirectionColumn) style.flexDirection = "column";
      if (flexDirectionRowReverse) style.flexDirection = "row-reverse";
      if (flexDirectionColumnReverse) style.flexDirection = "column-reverse";

      if (absoluteTopLeft) {
        style.position = "absolute";
        style.top = 0;
        style.left = 0;
      }
      if (absoluteTopLeftSmall) {
        style.position = "absolute";
        style.top = C.spacingSmall;
        style.left = C.spacingSmall;
      }
      if (absoluteTopLeftMedium) {
        style.position = "absolute";
        style.top = C.spacingMedium;
        style.left = C.spacingMedium;
      }
      if (absoluteTopLeftLarge) {
        style.position = "absolute";
        style.top = C.spacingLarge;
        style.left = C.spacingLarge;
      }
      if (absoluteTopLeftExtraLarge) {
        style.position = "absolute";
        style.top = C.spacingExtraLarge;
        style.left = C.spacingExtraLarge;
      }
      if (absoluteTopRight) {
        style.position = "absolute";
        style.top = 0;
        style.right = 0;
      }
      if (absoluteTopRightSmall) {
        style.position = "absolute";
        style.top = C.spacingSmall;
        style.right = C.spacingSmall;
      }
      if (absoluteTopRightMedium) {
        style.position = "absolute";
        style.top = C.spacingMedium;
        style.right = C.spacingMedium;
      }
      if (absoluteTopRightLarge) {
        style.position = "absolute";
        style.top = C.spacingLarge;
        style.right = C.spacingLarge;
      }
      if (absoluteTopRightExtraLarge) {
        style.position = "absolute";
        style.top = C.spacingExtraLarge;
        style.right = C.spacingExtraLarge;
      }
      if (absoluteBottomLeft) {
        style.position = "absolute";
        style.bottom = 0;
        style.left = 0;
      }
      if (absoluteBottomLeftSmall) {
        style.position = "absolute";
        style.bottom = C.spacingSmall;
        style.left = C.spacingSmall;
      }
      if (absoluteBottomLeftMedium) {
        style.position = "absolute";
        style.bottom = C.spacingMedium;
        style.left = C.spacingMedium;
      }
      if (absoluteBottomLeftLarge) {
        style.position = "absolute";
        style.bottom = C.spacingLarge;
        style.left = C.spacingLarge;
      }
      if (absoluteBottomLeftExtraLarge) {
        style.position = "absolute";
        style.bottom = C.spacingExtraLarge;
        style.left = C.spacingExtraLarge;
      }
      if (absoluteBottomRight) {
        style.position = "absolute";
        style.bottom = 0;
        style.right = 0;
      }
      if (absoluteBottomRightSmall) {
        style.position = "absolute";
        style.bottom = C.spacingSmall;
        style.right = C.spacingSmall;
      }
      if (absoluteBottomRightMedium) {
        style.position = "absolute";
        style.bottom = C.spacingMedium;
        style.right = C.spacingMedium;
      }
      if (absoluteBottomRightLarge) {
        style.position = "absolute";
        style.bottom = C.spacingLarge;
        style.right = C.spacingLarge;
      }
      if (absoluteBottomRightExtraLarge) {
        style.position = "absolute";
        style.bottom = C.spacingExtraLarge;
        style.right = C.spacingExtraLarge;
      }

      if (typeof flex === "number") style.flex = flex;
      if (flex === true) style.flex = 1;

      if (aspectRatioOne) {
        style.aspectRatio = 1;
      }

      if (invertX) style.transform = [{ scaleX: -1 }];
      if (invertY) style.transform = [{ scaleY: -1 }];

      return (
        <Component
          ref={ref}
          style={[style, passThroughStyle]}
          {...(passThroughProps as any)}
        />
      );
    }
  );
}
