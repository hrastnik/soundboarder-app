import { useIsFocused, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { useQuery } from "~/hooks/useQuery";
import { RecordingInstance } from "~/mobx/entities/recording/Recording";
import { useStore } from "~/mobx/utils/useStore";
import { NavigationProp } from "~/router/RouterTypes";

function useRecordingList({ enabled }: { enabled: boolean }) {
  const store = useStore();
  const query = useQuery(
    ["recordingList"],
    () => store.recordingStore.readRecordingList(),
    { enabled }
  );

  return query;
}

export const SoundboardListScreen = observer(function SoundboardListScreen() {
  const navigation = useNavigation<NavigationProp<"SoundboardListScreen">>();
  const isFocused = useIsFocused();
  const query = useRecordingList({ enabled: isFocused });

  if (query.isError) {
    return (
      <Screen {...query.getScreenProps()}>
        <View centerContent paddingExtraLarge>
          <Text>Something went wrong</Text>
        </View>
      </Screen>
    );
  }

  if (query.isLoading || !query.isSuccess) {
    return (
      <Screen {...query.getScreenProps()}>
        <View centerContent paddingExtraLarge>
          <Spinner />
        </View>
      </Screen>
    );
  }

  const soundboardList = query.data;
  const isEmpty = soundboardList.length === 0;

  return (
    <Screen>
      {isEmpty ? (
        <Button
          title="Create your first soundboard"
          onPress={() => {
            navigation.navigate("CreateSoundboardScreen");
          }}
        />
      ) : (
        <>
          {soundboardList.map((soundboard) => {
            return (
              <SoundboardListItem
                key={soundboard.uri}
                soundboard={soundboard}
              />
            );
          })}

          <Spacer extraLarge />

          <View>
            <Button
              title="Add another"
              onPress={() => {
                navigation.navigate("CreateSoundboardScreen");
              }}
            />
          </View>
        </>
      )}
    </Screen>
  );
});

const SoundboardListItem = observer(function SoundboardListItem({
  soundboard,
}: {
  soundboard: RecordingInstance;
}) {
  return (
    <TouchableOpacity paddingLarge onPress={soundboard.play}>
      <Text>{soundboard.filename}</Text>
    </TouchableOpacity>
  );
});
