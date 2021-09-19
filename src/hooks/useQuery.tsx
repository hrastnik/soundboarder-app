import React, { useState } from "react";
import { RefreshControl } from "react-native";
import {
  QueryFunction,
  useQuery as RQuseQuery,
  UseQueryOptions,
} from "react-query";
import { QueryKey } from "~/types/QueryKeys";

export function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  key: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  config?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) {
  const query = RQuseQuery(key, queryFn, config);

  // react-query doesn't keep track of this so we have to do it ourselves
  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async function onRefresh() {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await query.refetch().finally(() => {
      setIsRefreshing(false);
    });
  };
  // Standard Laravel response
  // const dataList = _.flatMap(
  //   query.data?.pages,
  //   (response) => response.data
  // ) as TResult["data"];

  function getRefreshControlProps() {
    return { refreshing: isRefreshing, onRefresh };
  }

  function getScreenProps() {
    return { refreshControl: <RefreshControl {...getRefreshControlProps()} /> };
  }

  return {
    ...query,
    isRefreshing,
    onRefresh,
    isRefetchError: query.isRefetchError,
    getRefreshControlProps,
    getScreenProps,
  };
}
