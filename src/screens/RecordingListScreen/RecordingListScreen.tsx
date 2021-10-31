import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { observer } from "mobx-react";
import React from "react";
import { FlatList } from "react-native";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { useQuery } from "~/hooks/useQuery";
import { useStore } from "~/mobx/utils/useStore";
import { RouteProp } from "~/router/RouterTypes";
import { constants } from "~/style/constants";
import { RecordingListItem } from "./RecordingListItem";

function useRecordingList({
  soundboard,
  enabled,
}: {
  soundboard: string;
  enabled: boolean;
}) {
  const store = useStore();
  const query = useQuery(
    ["recordingList", { soundboard }],
    () => store.recordingStore.readRecordingList({ soundboard }),
    { enabled }
  );

  return query;
}

export const RecordingListScreen = observer(function RecordingListScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute<RouteProp<"RecordingListScreen">>();
  const soundboard = route.params.soundboard;

  const query = useRecordingList({
    enabled: isFocused,
    soundboard,
  });

  const recordingList = query.data;

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
      <FlatList
        keyExtractor={(recording) => recording.basename}
        ListHeaderComponent={
          <View paddingExtraLarge centerContent>
            <Text alignCenter sizeExtraLarge>
              {soundboard}
            </Text>
          </View>
        }
        data={recordingList}
        contentContainerStyle={{
          padding: constants.spacingMedium,
        }}
        renderItem={({ item: recording }) => {
          return <RecordingListItem recording={recording} />;
        }}
        ItemSeparatorComponent={() => <Spacer large />}
        onRefresh={query.onRefresh}
        refreshing={query.isRefreshing}
        ListEmptyComponent={
          <View paddingExtraLarge>
            <Text alignCenter>
              No recordings yet. You should add one using the button bellow
            </Text>
          </View>
        }
        ListFooterComponent={
          <>
            <Spacer extraLarge />

            <Button
              title="+ ADD RECORDING"
              onPress={() => {
                navigation.navigate("CreateRecordingScreen", { soundboard });
              }}
            />
          </>
        }
      />
    </Screen>
  );
});
