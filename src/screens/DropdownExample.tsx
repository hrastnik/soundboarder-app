import React, { useState } from "react";

import { Screen } from "~/components/Screen";
import { View } from "~/components/View";
import { Text } from "~/components/Text";
import { Spacer } from "~/components/Spacer";
import { useDropdown } from "~/hooks/useDropdown";

export function DropdownExample() {
  return (
    <Screen withoutBottomTabBar>
      <DropdownWithObjects />

      <DropdownWithStrings />
    </Screen>
  );
}

function DropdownWithObjects() {
  const [index, setIndex] = useState<number | undefined>(undefined);
  const { renderedDropDown, renderedOptions, selectedOption } = useDropdown({
    optionList: ["String 0", "String 1", "String 2", "String 3"],
    placeholder: "Select a string",
    onSelected: setIndex,
    selectedIndex: index,
  });

  return (
    <View paddingMedium>
      {renderedDropDown}

      <Spacer extraLarge />

      <Text>Selected option: {JSON.stringify(selectedOption)}</Text>
      {renderedOptions}
    </View>
  );
}

function DropdownWithStrings() {
  const [index, setIndex] = useState<number | undefined>(undefined);
  const { renderedDropDown, renderedOptions, selectedOption } = useDropdown({
    optionList: [
      { id: 0, title: "Object 0" },
      { id: 1, title: "Object 1" },
      { id: 2, title: "Object 2" },
      { id: 3, title: "Object 3" },
    ],
    getLabel: (option) => option.title,
    placeholder: "Select an object",
    onSelected: setIndex,
    selectedIndex: index,
  });

  return (
    <View paddingMedium>
      {renderedDropDown}

      <Spacer extraLarge />

      <Text>Selected option: {JSON.stringify(selectedOption)}</Text>
      {renderedOptions}
    </View>
  );
}
