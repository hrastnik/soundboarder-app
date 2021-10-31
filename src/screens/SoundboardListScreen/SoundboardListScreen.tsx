import { useIsFocused, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { useQuery } from "~/hooks/useQuery";
import { useStore } from "~/mobx/utils/useStore";
import { constants } from "~/style/constants";

function useSoundboardList({ enabled }: { enabled: boolean }) {
  const store = useStore();
  const query = useQuery(
    ["soundboardList"],
    () => store.recordingStore.readSoundboardList(),
    { enabled }
  );

  return query;
}

export const SoundboardListScreen = observer(function SoundboardListScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const query = useSoundboardList({ enabled: isFocused });

  const soundboardList = query.data;

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
    <Screen
      preventScroll
      style={{
        paddingBottom: insets.bottom,
      }}
    >
      <View flex>
        <FlatList
          keyExtractor={(soundboard) => soundboard}
          ListHeaderComponent={
            <View paddingExtraLarge centerContent>
              <Text alignCenter sizeExtraLarge>
                Soundboard list
              </Text>
            </View>
          }
          data={soundboardList}
          contentContainerStyle={{
            padding: constants.spacingMedium,
          }}
          renderItem={({ item: soundboard }) => {
            return (
              <Button
                title={soundboard}
                outline
                onPress={() => {
                  navigation.navigate("RecordingListScreen", {
                    soundboard: soundboard,
                  });
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <Spacer large />}
          onRefresh={query.onRefresh}
          refreshing={query.isRefreshing}
          ListEmptyComponent={
            <View paddingExtraLarge>
              <Text alignCenter>
                No soundboards yet. You should add one using the button bellow
              </Text>
            </View>
          }
          ListFooterComponent={
            <>
              <Spacer large />

              <Button
                title="+ ADD SOUNDBOARD"
                onPress={() => {
                  navigation.navigate("CreateSoundboardScreen");
                }}
              />
            </>
          }
        />
      </View>
    </Screen>
  );
});
