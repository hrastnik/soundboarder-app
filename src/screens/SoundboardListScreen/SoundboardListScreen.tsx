import { useIsFocused, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { useQuery } from "~/hooks/useQuery";
import { useStore } from "~/mobx/utils/useStore";
import { NavigationProp } from "~/router/RouterTypes";
import { SoundboardListItem } from "./SoundboardListItem";

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

  const soundboardList = query.data;
  const isEmpty = soundboardList ? soundboardList.length === 0 : true;
  useEffect(() => {
    navigation.setOptions({
      headerRight() {
        if (!query.isSuccess || isEmpty) return null;
        return (
          <Button
            transparent
            style={{ width: 52 }}
            title="Add"
            onPress={() => {
              navigation.navigate("CreateSoundboardScreen");
            }}
          />
        );
      },
    });
  }, [navigation, isEmpty, query.isSuccess]);

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

  return (
    <Screen preventScroll>
      {isEmpty ? (
        <Button
          title="Create your first soundboard"
          onPress={() => {
            navigation.navigate("CreateSoundboardScreen");
          }}
        />
      ) : (
        <>
          <FlatList
            keyExtractor={(soundboard) => soundboard.uri}
            data={soundboardList}
            renderItem={({ item: soundboard }) => {
              return <SoundboardListItem soundboard={soundboard} />;
            }}
            onRefresh={query.onRefresh}
            refreshing={query.isRefreshing}
          />

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
