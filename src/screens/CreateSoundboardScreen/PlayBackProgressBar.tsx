import { observer } from "mobx-react";
import React from "react";
import { View } from "~/components/View";

export const PlayBackProgressBar = observer(function PlayBackProgressBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <View
      style={{ height: 10, width: "80%" }}
      alignSelfCenter
      justifyContentCenter
    >
      <View style={{ width: "100%", height: 2, backgroundColor: "#999999" }} />
      <View
        absoluteTopLeft
        style={{
          transform: [{ translateX: -5 }],
          left: `${progress * 100}%`,
          height: 10,
          width: 10,
          backgroundColor: "#000000",
          borderRadius: 5,
        }}
      />
    </View>
  );
});
