import { Alert, AlertButton } from "react-native";

/**
 * returns a promise that resolves either with true or false, depending
 * on wheather the user accepts or dismisses the prompt
 */

const promptYesNo = (
  {
    title,
    message,
    yesText = "Yes",
    noText = "No",
    yesStyle = "destructive",
    noStyle = "destructive",
  }: {
    title: string;
    message: string;
    yesText?: string;
    noText?: string;
    yesStyle?: AlertButton["style"];
    noStyle?: AlertButton["style"];
  },
  alert = Alert.alert
): Promise<boolean> =>
  new Promise((resolve) => {
    alert(
      title,
      message,
      [
        { text: noText, style: noStyle, onPress: () => resolve(false) },
        { text: yesText, style: yesStyle, onPress: () => resolve(true) },
      ],
      { cancelable: false, onDismiss: () => resolve(false) }
    );
  });

export { promptYesNo };
