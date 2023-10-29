import React from "react";
import { Link } from "react-router-dom";
import Text from "../Text/Text";

export default function PostTag(props) {
  const configTag = {
    fontSize: props.fontSize ? props.fontSize : "12px",
    color: props.color,
    fontWeight: "600",
    ...props
  };
  return (
    <Link to="#" style={{ textDecoration: "none" }}>
      <Text {...configTag}>#{props.text}</Text>
    </Link>
  );
}
