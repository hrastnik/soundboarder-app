import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { checkMultiple, PERMISSIONS, request } from "react-native-permissions";
import { useQuery, useQueryClient } from "react-query";
import { Button } from "~/components/Button";
import { Spacer } from "~/components/Spacer";
import { Text } from "~/components/Text";
import { View } from "~/components/View";

export const PermissionRequestView = observer(function PermissionRequestView({
  setArePermissionAccepted: propSetArePermissionsAccepted,
}: {
  setArePermissionAccepted: (value: boolean) => any;
}) {
  const client = useQueryClient();
  const query = useQuery(
    ["permissions"],
    async function requestPermissionsEffect() {
      const checkResult = await checkMultiple([
        PERMISSIONS.ANDROID.RECORD_AUDIO,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);

      const isAccepted =
        checkResult["android.permission.RECORD_AUDIO"] === "granted" &&
        checkResult["android.permission.READ_EXTERNAL_STORAGE"] === "granted" &&
        checkResult["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted";

      return isAccepted;
    }
  );

  const isAccepted = query.data === true;

  useEffect(() => {
    console.warn(isAccepted);

    if (isAccepted) {
      propSetArePermissionsAccepted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAccepted]);

  return (
    <View flex paddingMedium>
      <View paddingHorizontalLarge>
        <Text>
          In order for Soundboarder to work, it needs some permissions...
        </Text>
      </View>
      <Spacer extraLarge />
      <Spacer extraLarge />

      <View paddingHorizontalLarge>
        <Text>
          We need audio recording permissions to enable you record audio for
          your soundboards.
        </Text>
      </View>
      <Spacer large />
      <Button
        title="Grant recording permission"
        onPress={async () => {
          await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
          client.invalidateQueries(["permissions"]);
        }}
      />

      <Spacer extraLarge />
      <Spacer medium />

      <View paddingHorizontalLarge>
        <Text>
          We need storage write access so we can save the recordings to your
          phone.
        </Text>
      </View>
      <Spacer large />
      <Button
        title="Grant storage write permission"
        onPress={async () => {
          await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
          client.invalidateQueries(["permissions"]);
        }}
      />

      <Spacer extraLarge />
      <Spacer medium />

      <View paddingHorizontalLarge>
        <Text>
          We need storage read access so we can load the recordings already
          saved on your phone.
        </Text>
      </View>
      <Spacer large />
      <Button
        title="Grant storage read permission"
        onPress={async () => {
          await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          client.invalidateQueries(["permissions"]);
        }}
      />
    </View>
  );
});
