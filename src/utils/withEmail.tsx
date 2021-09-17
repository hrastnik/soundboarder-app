import React from "react";
import _ from "lodash";

import { intersperse } from "./intersperse";
import { Text } from "~/components/Text";

export function withEmail(
  text: string | (string | React.ReactElement)[],
  onEmailPress: (email: string) => any
) {
  const emailRegex = new RegExp(
    /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g
  );
  const textArray: (string | React.ReactElement)[] = _.castArray(text);

  const emailList = _.flatMap(textArray, (textOrElement) => {
    if (typeof textOrElement === "string") {
      return textOrElement.match(emailRegex) ?? [];
    }

    return [];
  });

  for (const email of emailList) {
    const handleEmailPress = () => onEmailPress(email);

    for (let i = 0; i < textArray.length; i++) {
      const textChunk = textArray[i];
      if (typeof textChunk !== "string") continue;
      const textSplit = textChunk.split(email);
      const textInterspersed = intersperse(textSplit, (index) => (
        <Text colorTheme onPress={handleEmailPress} key={`${index} ${email}`}>
          {email}
        </Text>
      ));

      textArray.splice(i, 1, ...textInterspersed);
    }
  }

  return textArray;
}
