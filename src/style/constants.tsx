import { Dimensions } from "react-native";
import Color from "color";

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
  colorBackgroundThemeSoft: Color(colorBackgroundTheme)
    .lighten(0.25)
    .rgb()
    .string(2),
  colorBackgroundThemeSofter: Color(colorBackgroundTheme)
    .lighten(0.5)
    .rgb()
    .string(2),
  colorBackgroundThemeHard: Color(colorBackgroundTheme)
    .darken(0.25)
    .rgb()
    .string(2),
  colorBackgroundThemeHarder: Color(colorBackgroundTheme)
    .darken(0.5)
    .rgb()
    .string(2),
  colorBackgroundLightDark: Color(colorBackgroundLight)
    .darken(0.015)
    .rgb()
    .string(2),
  colorBackgroundLightDarker: Color(colorBackgroundLight)
    .darken(0.25)
    .rgb()
    .string(2),
  colorBackgroundDarkLight: Color(colorBackgroundDark)
    .lighten(0.15)
    .rgb()
    .string(2),
  colorBackgroundDarkLighter: Color(colorBackgroundDark)
    .lighten(0.25)
    .rgb()
    .string(2),

  colorTextTheme: "#308CC3",
  colorTextAccent: "#ba0000",
  colorTextLight,
  colorTextDark,
  colorTextDanger: "#ff4444",
  colorTextLightSoft: Color(colorTextLight).fade(0.3).rgb().string(2),
  colorTextLightSofter: Color(colorTextLight).fade(0.5).rgb().string(2),
  colorTextDarkSoft: Color(colorTextDark).fade(0.3).rgb().string(2),
  colorTextDarkSofter: Color(colorTextDark).fade(0.5).rgb().string(2),

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
