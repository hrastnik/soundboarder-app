import { useEffect, useCallback } from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { promptYesNo } from "~/utils/promptYesNo";
import { useAlert } from "./useAlert";

export function useBackWarning(
  shouldShowWarning: boolean,
  onBackWarningMessage: any
) {
  const alert = useAlert();
  const navigation = useNavigation();

  const onHardwareBackPress: any = useCallback(async () => {
    if (shouldShowWarning) {
      const allowGoback = await promptYesNo(
        {
          title: "Warning",
          message: onBackWarningMessage,
          noText: "No",
          yesText: "Yes",
        },
        alert
      );
      if (allowGoback) {
        navigation.goBack();
      }
    } else {
      navigation.goBack();
    }
    return true;
  }, [shouldShowWarning, navigation, alert, onBackWarningMessage]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onHardwareBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onHardwareBackPress);
  }, [onHardwareBackPress]);

  useEffect(() => {
    navigation.setOptions({
      onBackWarning: shouldShowWarning ? onBackWarningMessage : undefined,
    } as any);
  }, [navigation, onBackWarningMessage, shouldShowWarning]);
}
