import { observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import {
  checkMultiple,
  PERMISSIONS,
  PermissionStatus,
  request,
} from "react-native-permissions";
import { Button } from "~/components/Button";
import { View } from "~/components/View";

const permissionState = observable({
  recordAudio: undefined as undefined | PermissionStatus,
  writeExternalStorage: undefined as undefined | PermissionStatus,
  readExternalStorage: undefined as undefined | PermissionStatus,
});

export const PermissionRequestView = observer(function PermissionRequestView({
  setArePermissionAccepted: propSetArePermissionsAccepted,
}: {
  setArePermissionAccepted: (value: boolean) => any;
}) {
  useEffect(() => {
    async function requestPermissionsEffect() {
      console.warn("Check multiple");

      const checkResult = await checkMultiple([
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);

      console.warn("Check multiple", checkResult);

      runInAction(() => {
        permissionState.recordAudio =
          checkResult["android.permission.RECORD_AUDIO"];
        permissionState.readExternalStorage =
          checkResult["android.permission.READ_EXTERNAL_STORAGE"];
        permissionState.writeExternalStorage =
          checkResult["android.permission.WRITE_EXTERNAL_STORAGE"];
      });
    }
    requestPermissionsEffect();
  }, []);

  const isAccepted = Object.values(permissionState).every(
    (v) => v === "granted"
  );
  useEffect(() => {
    console.warn(isAccepted);

    if (isAccepted) {
      propSetArePermissionsAccepted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccepted]);

  return (
    <View flex paddingMedium>
      <Button
        title="Request RECORD_AUDIO permission"
        onPress={async () => {
          const requestResult = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
          permissionState.recordAudio = requestResult;
        }}
      />

      <Button
        title="Request WRITE_EXTERNAL_STORAGE permission"
        onPress={async () => {
          const requestResult = await request(
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
          );
          permissionState.writeExternalStorage = requestResult;
        }}
      />

      <Button
        title="Request READ_EXTERNAL_STORAGE permission"
        onPress={async () => {
          const requestResult = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          );
          permissionState.writeExternalStorage = requestResult;
        }}
      />
    </View>
  );
});
