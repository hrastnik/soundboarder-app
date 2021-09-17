import React, { ReactNode } from "react";

import { TouchableOpacity } from "~/components/TouchableOpacity";
import { Icon } from "~/components/Icon";
import { View, ViewProps } from "~/components/View";
import { constants as C } from "~/style/constants";

interface CheckBoxProps {
  size?: number;
  checked: boolean;
  children?: ReactNode;
  style?: ViewProps["style"];
  onChange: (isChecked: boolean) => any;
}

function CheckBox({
  checked,
  size = 28,
  style,
  children,
  onChange,
}: CheckBoxProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        onChange(!checked);
      }}
    >
      <View flexDirectionRow alignItemsCenter style={style}>
        <Icon
          size={size}
          name={checked ? "check-box" : "check-box-outline-blank"}
          color={C.colorBackgroundTheme}
        />
        {children}
      </View>
    </TouchableOpacity>
  );
}

export { CheckBox };
