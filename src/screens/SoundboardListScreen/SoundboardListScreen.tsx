import { useIsFocused, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { PropsWithoutRef, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQueryClient } from "react-query";
import { Button, ButtonProps } from "~/components/Button";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
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

const HeaderAddButton = (props: PropsWithoutRef<ButtonProps>) => {
  return <Button transparent style={{ width: 52 }} title="Add" {...props} />;
};

export const SoundboardListScreen = observer(function SoundboardListScreen() {
  const insets = useSafeAreaInsets();
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
          <HeaderAddButton
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
                onPress={() => {
                  navigation.navigate("RecordingListScreen", {
                    soundboard: soundboard,
                  });
                }}
              />
            );
          }}
          onRefresh={query.onRefresh}
          refreshing={query.isRefreshing}
          ListEmptyComponent={
            <>
              <Button
                // outline
                title="Create your first soundboard"
                onPress={() => {
                  // navigation.navigate("");
                }}
              />
            </>
          }
        />
      </View>

      <Spacer extraLarge />
      <View paddingMedium>
        <CreateRecordingView
          onPress={async (name) => {
            if (!name) return;
            const env = getEnv(store);
            await env.fs.mkdir(`${env.fs.dirs.DocumentDir}/${name}`);
            queryClient.invalidateQueries(["soundboardList"]);
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

      <Spacer large />

      <Button
        title="Create new soundboard +"
        onPress={async () => {
          await onPress(name);
          setName("");
        }}
      />
    </View>
  );
};
