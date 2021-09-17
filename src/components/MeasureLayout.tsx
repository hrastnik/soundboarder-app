import React, { useState, ReactNode } from "react";

import { View } from "./View";

interface MeasureLayoutProps {
  children: (dimensions: { width: number; height: number }) => ReactNode;
}

export function MeasureLayout({ children, ...props }: MeasureLayoutProps) {
  const [dimensions, setDimensions] = useState<
    | {
        width: number;
        height: number;
      }
    | undefined
  >(undefined);

  return (
    <View
      flex
      onLayout={(event) => {
        setDimensions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        });
      }}
      {...props}
    >
      {dimensions !== undefined && children(dimensions)}
    </View>
  );
}
