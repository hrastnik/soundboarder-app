import React, { memo, useCallback, useState } from "react";
import { Image, ImageProps, StyleSheet } from "react-native";

import { Spinner } from "./Spinner";
import { View, ViewProps } from "./View";

export interface ImageWithLoaderProps extends ImageProps {
  containerProps?: ViewProps;
  spinnerWrapProps?: ViewProps;
}

export const ImageWithLoader = memo(function ImageWithLoader({
  containerProps = { style: StyleSheet.absoluteFill },
  spinnerWrapProps = { style: StyleSheet.absoluteFill, centerContent: true },
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const onLoadStart = useCallback(() => {
    setIsLoading(true);
  }, []);
  const onLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);
  const onError = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <View {...containerProps}>
      <Image
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        {...props}
      />
      {isLoading && (
        <View {...spinnerWrapProps}>
          <Spinner />
        </View>
      )}
    </View>
  );
});
