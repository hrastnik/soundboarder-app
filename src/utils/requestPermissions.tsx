import { PermissionsAndroid, Platform, Permission } from "react-native";
import { promptYesNo } from "./promptYesNo";

/**
 *
 * @param {array} permissions - Array of object of shape { type, title, message, error }
 *
 * returns { permissionsGranted: bool, error: oneOf(undefined, string) }
 */
const requestPermissions = async (
  permissions: {
    type: Permission;
    title: string;
    message: string;
    error?: string;
  }[]
) => {
  if (Platform.OS !== "android") {
    return { permissionsGranted: true, error: undefined };
  }

  try {
    for (let i = 0; i < permissions.length; i += 1) {
      const permission = permissions[i];
      const { type, title, message, error } = permission;

      const alreadyGranted = await PermissionsAndroid.check(type);

      if (alreadyGranted === true) {
        continue;
      }

      try {
        await promptYesNo({
          title,
          message,
          yesText: "ACCEPT",
          noText: "REJECT",
        });
      } catch (error) {
        console.log("error checking for permissions", error);
        throw new Error(permission.error || "Additional permission required!");
      }

      const granted = await PermissionsAndroid.request(type, {
        message,
        title,
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Reject",
        buttonPositive: "Accept",
      });

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error(error || "Additional permission required");
      }
    }

    return { permissionsGranted: true, error: undefined };
  } catch (error) {
    return {
      permissionsGranted: false,
      error: error instanceof Error ? error.message : error,
    };
  }
};

export { requestPermissions };
