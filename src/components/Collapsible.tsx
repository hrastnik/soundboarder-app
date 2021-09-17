import React, { useRef, useState, useCallback, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";

const S = StyleSheet.create({
  absolute: { position: "absolute" },
});

export function Collapsible({
  children,
  isOpen,
  duration = 300,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  duration?: number;
}) {
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  const [animatedHeight] = useState(() => new Animated.Value(0));
  const innerViewHeight = useRef<number | undefined>(undefined);
  const prevAnimationFinished = useRef(true);

  const runHeightSync = useCallback(
    function runHeightSync() {
      Animated.timing(animatedHeight, {
        toValue: isOpenRef.current ? (innerViewHeight.current as number) : 0,
        duration,
        useNativeDriver: false,
      }).start(({ finished }) => {
        prevAnimationFinished.current = finished;
      });
    },
    [duration, animatedHeight]
  );

  useEffect(() => {
    runHeightSync();
  }, [isOpen, runHeightSync]);

  const onLayout = useCallback(
    function onLayout(e) {
      innerViewHeight.current = e.nativeEvent.layout.height;
      runHeightSync();
    },
    [runHeightSync]
  );

  return (
    <Animated.View
      style={{ height: animatedHeight, overflow: "hidden" }}
      collapsable={false}
    >
      <View style={S.absolute} onLayout={onLayout} collapsable={false}>
        {children}
      </View>
    </Animated.View>
  );
}
