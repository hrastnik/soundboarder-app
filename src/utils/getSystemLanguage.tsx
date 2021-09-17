import { Platform, NativeModules } from "react-native";

export function getSystemLanguage() {
  try {
    if (Platform.OS === "ios") {
      const locale: string =
        NativeModules.SettingsManager.settings.AppleLocale ??
        NativeModules.SettingsManager.settings.AppleLanguages[0];
      if (["hr", "hr_HR"].includes(locale)) return "croatian";
    }

    if (Platform.OS === "android") {
      const identifier = NativeModules.I18nManager.localeIdentifier;

      if (["hr", "hr_HR"].includes(identifier)) return "croatian";
    }

    return "english";
  } catch {
    return "english";
  }
}
