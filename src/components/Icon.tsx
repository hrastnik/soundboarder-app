import React from "react";
import { TextStyle } from "react-native";
// TODO import icon pack and re-export selected icons
// import {
//   Entypo,
//   Ionicons,
//   MaterialCommunityIcons,
//   AntDesign,
//   MaterialIcons,
// } from "@expo/vector-icons";
import { constants } from "~/style/constants";
import { Text } from "./Text";

export interface IconProps {
  name:
    | "account-edit"
    | "account-outline"
    | "addfile"
    | "art-track"
    | "attach-file"
    | "bell-outline"
    | "calendar-blank"
    | "camera"
    | "check-box-outline-blank"
    | "check-box"
    | "check-circle-outline"
    | "chevron-down"
    | "chevron-small-left"
    | "chevron-small-right"
    | "clipboard-text-outline"
    | "close"
    | "comment-outline"
    | "comment"
    | "delete-outline"
    | "edit"
    | "email-outline"
    | "file-document-box-multiple-outline"
    | "file-document-outline"
    | "flag-outline"
    | "group"
    | "heart-outline"
    | "heart"
    | "help"
    | "home-outline"
    | "image-outline"
    | "information-outline"
    | "link-variant"
    | "logout"
    | "magnify"
    | "md-radio-button-off"
    | "md-radio-button-on"
    | "minus-circle-outline"
    | "newspaper"
    | "phone"
    | "play"
    | "plus"
    | "refresh"
    | "rss-feed"
    | "tune"
    | "video";

  color?: string;
  size?: number;
  style?: TextStyle;
}

export function Icon({
  name,
  color = constants.colorTextLight,
  size = 28,
  ...props
}: IconProps) {
  console.log("Todo, install icons", { name, color, size, props });
  return <Text>:(</Text>;

  // switch (name) {
  //   case "art-track":
  //   case "attach-file":
  //   case "check-box-outline-blank":
  //   case "check-box":
  //   case "edit":
  //   case "phone":
  //   case "rss-feed":
  //   case "tune":
  //   case "group":
  //     return <MaterialIcons size={size} color={color} name={name} {...props} />;
  //   case "account-edit":
  //   case "account-outline":
  //   case "bell-outline":
  //   case "calendar-blank":
  //   case "camera":
  //   case "check-circle-outline":
  //   case "chevron-down":
  //   case "clipboard-text-outline":
  //   case "close":
  //   case "comment-outline":
  //   case "comment":
  //   case "delete-outline":
  //   case "email-outline":
  //   case "file-document-box-multiple-outline":
  //   case "file-document-outline":
  //   case "flag-outline":
  //   case "heart-outline":
  //   case "heart":
  //   case "help":
  //   case "home-outline":
  //   case "image-outline":
  //   case "information-outline":
  //   case "link-variant":
  //   case "logout":
  //   case "magnify":
  //   case "minus-circle-outline":
  //   case "newspaper":
  //   case "play":
  //   case "plus":
  //   case "refresh":
  //   case "video":
  //     return (
  //       <MaterialCommunityIcons
  //         size={size}
  //         color={color}
  //         name={name}
  //         {...props}
  //       />
  //     );

  //   case "chevron-small-left":
  //   case "chevron-small-right":
  //     return <Entypo size={size} color={color} name={name} {...props} />;

  //   case "md-radio-button-off":
  //   case "md-radio-button-on":
  //     return <Ionicons size={size} color={color} name={name} {...props} />;

  //   case "addfile":
  //     return <AntDesign size={size} color={color} name={name} {...props} />;

  //   default:
  //     console.error(`Icon unsupported name "${name}"`);
  //     break;
  // }

  // return null;
}
