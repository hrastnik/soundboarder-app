import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { Button } from "~/components/Button";
import { Modal } from "~/components/ModalProvider";
import { Spacer } from "~/components/Spacer";
import { TextInput } from "~/components/TextInput";
import { View } from "~/components/View";
import { useAlert } from "~/hooks/useAlert";
import { useDropdown } from "~/hooks/useDropdown";
import { getEnv } from "~/mobx/utils/getEnv";
import { useStore } from "~/mobx/utils/useStore";
import { promptYesNo } from "~/utils/promptYesNo";
import { shadow } from "~/utils/shadow";

export const SoundboardListItem = observer(function SoundboardListItem({
  soundboard,
}: {
  soundboard: string;
}) {
  const alert = useAlert();
  const store = useStore();
  const env = getEnv(store);
  const client = useQueryClient();
  const navigation = useNavigation();

  const [shouldGrabName, setShouldGrabName] = useState(false);
  const [name, setName] = useState("");

  const { showDropdown, renderedOptions } = useDropdown({
    optionList: ["Delete", "Rename"],
    selectedIndex: undefined,
    async onSelected(index) {
      if (index === 0) {
        const shouldRemove = await promptYesNo(
          {
            title: "Warning",
            message: "Are your sure you want to delete this soundboard?",
          },
          alert
        );
        if (!shouldRemove) return;

        const currentName = `${env.fs.dirs.DocumentDir}/${soundboard}`;
        try {
          await env.fs.unlink(currentName);
          await client.refetchQueries(["soundboardList"]);
        } catch (error) {
          alert(
            "Error",
            "Something went wrong while trying to delete soundboard\n\n" +
              String(error)
          );
        }
      }
      if (index === 1) {
        setShouldGrabName(true);
      }
    },
  });

  return (
    <>
      <Button
        title={soundboard}
        outline
        onPress={() => {
          navigation.navigate("RecordingListScreen", {
            soundboard: soundboard,
          });
        }}
        onLongPress={() => {
          showDropdown();
        }}
      />

      {renderedOptions}

      {shouldGrabName && (
        <Modal>
          <View
            flex
            centerContent
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            <View
              style={{ width: "80%", ...shadow(4) }}
              colorLight
              paddingMedium
            >
              <TextInput
                autoFocus
                label="Rename to"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                }}
              />

              <Spacer extraLarge />

              <Button
                title="Save"
                onPress={async function renameRecording() {
                  const currentName = `${env.fs.dirs.DocumentDir}/${soundboard}`;
                  const newName = `${env.fs.dirs.DocumentDir}/${name}`;
                  const doesExist = await env.fs.exists(newName);
                  if (doesExist) {
                    alert(
                      "Error",
                      "A soundboard with that name already exists."
                    );

                    return;
                  }

                  try {
                    await env.fs.mv(currentName, newName);
                    await client.refetchQueries(["soundboardList"]);
                  } catch (error) {
                    alert(
                      "Error",
                      "Something went wrong while trying to rename soundboard\n\n" +
                        String(error)
                    );
                  }
                }}
              />

              <Spacer large />

              <Button
                title="Cancel"
                onPress={() => {
                  setShouldGrabName(false);
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
});
