import { useNavigation } from "@react-navigation/core";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { TextInput } from "~/components/TextInput";
import { View } from "~/components/View";
import { useAlert } from "~/hooks/useAlert";
import { getEnv } from "~/mobx/utils/getEnv";
import { useStore } from "~/mobx/utils/useStore";

export const CreateSoundboardScreen = observer(
  function CreateSoundboardScreen() {
    const store = useStore();
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const [name, setName] = useState("");
    const alert = useAlert();

    return (
      <Screen>
        <View paddingMedium>
          <View>
            <TextInput
              autoFocus
              label="Soundboard name"
              placeholder="Nature sounds"
              withoutCaption
              value={name}
              onChangeText={setName}
            />

            <Spacer extraLarge />

            <Button
              paddingHorizontalLarge
              title="ADD SOUNDBOARD"
              disabled={!name}
              onPress={async () => {
                if (!name) return;

                try {
                  const env = getEnv(store);
                  await env.fs.mkdir(`${env.fs.dirs.DocumentDir}/${name}`);
                  queryClient.refetchQueries(["soundboardList"]);
                  navigation.goBack();
                } catch (error) {
                  alert(
                    "Error",
                    "Something went wrong while creating soundboard\n\n" +
                      String(error)
                  );
                }
              }}
            />
          </View>
        </View>
      </Screen>
    );
  }
);
