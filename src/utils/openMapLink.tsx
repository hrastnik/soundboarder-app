import { Platform, Linking } from "react-native";

function openMapLink({
  latitude,
  longitude,
  formattedAddress = "Unknown Location",
}: {
  latitude: number;
  longitude: number;
  formattedAddress?: string;
}) {
  const resolvedScheme =
    Platform.OS === "ios"
      ? `http://maps.apple.com/?ll=${latitude},${longitude}&q=${formattedAddress}`
      : `geo:${latitude},${longitude}?q=${formattedAddress}`;

  Linking.openURL(resolvedScheme);
}

export { openMapLink };
