import React from "react";
import { Link } from "react-router-dom";
import Text from "../Text/Text";

export default function PostTag(props) {
  const configTag = {
    fontSize: props.fontSize ? props.fontSize : "12px",
    color: props.color,
    fontWeight: "600",
    ...props,
  };
  return <Text {...configTag}>{props.text && `#${props.text}`}</Text>;
}
