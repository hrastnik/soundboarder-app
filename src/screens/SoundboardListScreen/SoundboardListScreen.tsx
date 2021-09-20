import { useIsFocused, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useQueryClient } from "react-query";
import { Button } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { useQuery } from "~/hooks/useQuery";
import { getEnv } from "~/mobx/utils/getEnv";
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
  const store = useStore();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const query = useSoundboardList({ enabled: isFocused });

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
              // navigation.navigate("CreateRecordingScreen");
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
            // navigation.navigate("");
          }}
        />
      ) : (
        <>
          <FlatList
            numColumns={3}
            keyExtractor={(soundboard) => soundboard}
            data={soundboardList}
            renderItem={({ item: soundboard }) => {
              return (
                <TouchableOpacity
                  flex
                  paddingMedium
                  aspectRatioOne
                  onPress={() => {
                    navigation.navigate("RecordingListScreen", {
                      soundboard: soundboard,
                    });
                  }}
                >
                  <View
                    flex
                    style={{
                      borderWidth: 2,
                      borderColor: constants.colorTextAccent,
                    }}
                    centerContent
                  >
                    <Text>{soundboard}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            onRefresh={query.onRefresh}
            refreshing={query.isRefreshing}
          />

          <Spacer extraLarge />
        </>
      )}
      <View>
        <CreateRecordingView
          onPress={async (name) => {
            if (!name) return;
            const env = getEnv(store);
            await env.fs.mkdir(`${env.fs.dirs.DocumentDir}/${name}`);
            queryClient.invalidateQueries(["soundboardList"]);
            // store.recordingStore.createSoundboard();
          }}
        />
      </View>
    </Screen>
  );
});

const CreateRecordingView = ({ onPress }: { onPress(name: string): any }) => {
  const [name, setName] = useState("");
  return (
    <View>
      <TextInput
        label="Create"
        withoutCaption
        // withoutLabel
        value={name}
        onChangeText={setName}
      />

      <Button
        title="CREATE"
        onPress={async () => {
          await onPress(name);
          setName("");
        }}
      />
    </View>
  );
};
