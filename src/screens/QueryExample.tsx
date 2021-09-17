import { observer } from "mobx-react";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Screen } from "~/components/Screen";
import { Spacer } from "~/components/Spacer";
import { Spinner } from "~/components/Spinner";
import { Text } from "~/components/Text";
import { View } from "~/components/View";
import { useInfiniteQuery } from "~/hooks/useInfiniteQuery";
import { PersonInstance } from "~/mobx/entities/person/Person";
import { useStore } from "~/mobx/utils/useStore";
import { constants } from "~/style/constants";
import { shadow } from "~/utils/shadow";

interface PersonListItemProps {
  person: PersonInstance;
}

function useStyle() {
  return StyleSheet.create({
    container: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: constants.colorTextAccent,
      backgroundColor: constants.colorBackgroundThemeSofter,
      ...shadow(2),
    },
  });
}

const PersonListItem = observer(function PersonListItem({
  person,
}: PersonListItemProps) {
  const S = useStyle();

  return (
    <View paddingHorizontalMedium paddingVerticalSmall>
      <View paddingMedium style={S.container} flexDirectionRow>
        <View flex>
          <Text>
            <Text colorDarkSoft>Name:</Text> {person.name}
          </Text>
          <Text>
            <Text colorDarkSoft>Gender:</Text> {person.gender}
          </Text>
          <Text>
            <Text colorDarkSoft>Height (cm):</Text> {person.height}
          </Text>
          <Text>
            <Text colorDarkSoft>Mass (kg):</Text> {person.mass}
          </Text>
        </View>
        <View flex>
          <Text>
            <Text colorDarkSoft>Hair color:</Text> {person.hair_color}
          </Text>
          <Text>
            <Text colorDarkSoft>Skin color:</Text> {person.skin_color}
          </Text>
          <Text>
            <Text colorDarkSoft>Eye color:</Text> {person.eye_color}
          </Text>
          <Text>
            <Text colorDarkSoft>Birth year:</Text> {person.birth_year}
          </Text>
        </View>
      </View>
    </View>
  );
});

export const QueryExample = observer(function QueryExample() {
  const store = useStore();
  const query = useInfiniteQuery(["peopleList"], ({ pageParam }) => {
    return store.personStore.readPersonList({ page: pageParam });
  });

  return (
    <Screen preventScroll>
      <FlatList
        data={query.dataList}
        keyExtractor={(item) => item.url}
        renderItem={({ item: person }) => {
          return <PersonListItem person={person} />;
        }}
        ListHeaderComponent={
          query.isRefetchError ? (
            <View flex centerContent paddingExtraLarge>
              <Text>Something went wrong</Text>
              <Text onPress={query.onRefresh} colorTheme>
                Tap here or pull down to retry
              </Text>
              <Text sizeSmall>{query.error?.message}</Text>
            </View>
          ) : undefined
        }
        ItemSeparatorComponent={() => <Spacer />}
        onEndReachedThreshold={0.15}
        onEndReached={query.onEndReached}
        onRefresh={query.onRefresh}
        refreshing={query.isRefreshing}
        ListEmptyComponent={
          query.isError && !query.isFetchMoreError && !query.isRefetchError ? (
            <View>
              <View aspectRatioOne centerContent paddingExtraLarge>
                <Text>Something went wrong</Text>
                <Text sizeSmall>{query.error?.message}</Text>
                <Text colorAccent onPress={() => query.refetch()}>
                  Tap here or pull down to retry
                </Text>
              </View>
            </View>
          ) : query.isLoading ? (
            <View aspectRatioOne centerContent paddingExtraLarge>
              <Text>Loading...</Text>
            </View>
          ) : (
            <View aspectRatioOne centerContent paddingExtraLarge>
              <Text>Nothing here. Try refreshing.</Text>
            </View>
          )
        }
        ListFooterComponent={
          query.isFetchingNextPage ? (
            <Spinner style={{ padding: constants.spacingLarge }} />
          ) : query.isFetchMoreError ? (
            <View flex centerContent paddingExtraLarge>
              <Text>Something went wrong while getting data</Text>
              <Text sizeSmall>{query.error?.message}</Text>
              <Text onPress={() => query.fetchNextPage()} colorTheme>
                Try again?
              </Text>
            </View>
          ) : undefined
        }
      />
    </Screen>
  );
});
