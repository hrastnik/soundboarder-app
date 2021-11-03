import { Dimensions } from "react-native";
import { colord } from "colord";

const window = Dimensions.get("window");

const colorBackgroundTheme = "#E0B9BB";
const colorBackgroundLight = "rgba(250,250,250,1)";
const colorBackgroundDark = "#35364B";

const colorTextLight = "rgba(255, 255, 255, 0.9)";
const colorTextDark = "rgba(0, 0, 0, 0.9)";

export const constants = {
  windowWidth: window.width,
  windowHeight: window.height,
  colorBackgroundTheme,
  colorBackgroundAccent: "#ba0000",
  colorBackgroundLight,
  colorBackgroundDark,
  colorBackgroundDanger: "#ff4444",
  colorBackgroundThemeSoft: colord(colorBackgroundTheme)
    .lighten(0.25)
    .toRgbString(),
  colorBackgroundThemeSofter: colord(colorBackgroundTheme)
    .lighten(0.5)
    .toRgbString(),
  colorBackgroundThemeHard: colord(colorBackgroundTheme)
    .darken(0.25)
    .toRgbString(),
  colorBackgroundThemeHarder: colord(colorBackgroundTheme)
    .darken(0.5)
    .toRgbString(),
  colorBackgroundLightDark: colord(colorBackgroundLight)
    .darken(0.015)
    .toRgbString(),
  colorBackgroundLightDarker: colord(colorBackgroundLight)
    .darken(0.25)
    .toRgbString(),
  colorBackgroundDarkLight: colord(colorBackgroundDark)
    .lighten(0.15)
    .toRgbString(),
  colorBackgroundDarkLighter: colord(colorBackgroundDark)
    .lighten(0.25)
    .toRgbString(),

  colorTextTheme: "#308CC3",
  colorTextAccent: "#ba0000",
  colorTextLight,
  colorTextDark,
  colorTextDanger: "#ff4444",
  colorTextLightSoft: colord(colorTextLight).darken(0.3).toRgbString(),
  colorTextLightSofter: colord(colorTextLight).darken(0.5).toRgbString(),
  colorTextDarkSoft: colord(colorTextDark).lighten(0.3).toRgbString(),
  colorTextDarkSofter: colord(colorTextDark).lighten(0.5).toRgbString(),

  spacingSmall: 4,
  spacingMedium: 8,
  spacingLarge: 16,
  spacingExtraLarge: 32,

  fontSizeExtraSmall: 8,
  fontSizeSmall: 13,
  fontSizeMedium: 16,
  fontSizeLarge: 20,
  fontSizeExtraLarge: 32,

  fontWeightLight: "300" as const,
  fontWeightRegular: "400" as const,
  fontWeightSemiBold: "500" as const,
  fontWeightBold: "700" as const,
  fontWeightExtraBold: "800" as const,
};
