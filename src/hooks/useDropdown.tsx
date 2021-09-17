import React, { useState } from "react";
import { StyleSheet, ScrollView, useWindowDimensions } from "react-native";
import _ from "lodash";

import { Modal } from "~/components/ModalProvider";
import { Text } from "~/components/Text";
import { TextInput } from "~/components/TextInput";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { View } from "~/components/View";
import { constants } from "~/style/constants";

interface UseDropdownProps<OptionType> {
  optionList: OptionType[];
  selectedIndex: number | undefined;
  onSelected(index: number, option: OptionType): any;
  getLabel?: (option: OptionType) => string;
  placeholder?: string;
}

export function useDropdown<OptionType>({
  optionList,
  onSelected,
  getLabel = _.identity,
  selectedIndex,
  placeholder = "Select an option",
}: UseDropdownProps<OptionType>) {
  const window = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);

  const showDropdown = () => setIsOpen(true);
  const hideDropdown = () => setIsOpen(false);

  const labelList = optionList.map(getLabel);
  const selectedLabel =
    selectedIndex == null ? undefined : labelList[selectedIndex];
  const selectedOption =
    selectedIndex == null ? undefined : optionList[selectedIndex];

  /**
   * renderedDropDown is app specific. You should adapt this to look as you want.
   */
  const renderedDropDown = (
    <TouchableOpacity onPress={() => setIsOpen(true)}>
      <TextInput
        pointerEvents="none"
        value={selectedLabel}
        placeholder={placeholder}
      />
      <View style={S.inputIconWrap}>
        <Text>▼</Text>
      </View>
    </TouchableOpacity>
  );

  const renderedOptions = !isOpen ? null : (
    <Modal>
      <TouchableOpacity
        flex
        centerContent
        style={S.backdrop}
        onPress={hideDropdown}
      >
        <View
          style={[S.optionsWrap, { maxHeight: window.height * 0.7 }]}
          paddingMedium
        >
          <ScrollView>
            {optionList.map((option, index) => {
              const label = labelList[index];

              return (
                <TouchableOpacity
                  key={`${option}:${index}`}
                  paddingVerticalMedium
                  paddingHorizontalLarge
                  onPress={() => {
                    onSelected(index, option);
                    hideDropdown();
                  }}
                >
                  <Text sizeLarge colorDark>
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return {
    renderedDropDown,
    renderedOptions,
    selectedOption,
    showDropdown,
    hideDropdown,
  };
}

const S = StyleSheet.create({
  backdrop: { backgroundColor: "rgba(0,0,0,0.3)" },
  inputIconWrap: {
    position: "absolute",
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  optionsWrap: {
    width: "80%",
    borderRadius: 8,
    backgroundColor: constants.colorBackgroundLight,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});
