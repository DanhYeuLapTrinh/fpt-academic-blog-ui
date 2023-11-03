import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import Text from "../../atoms/Text/Text";
import { Stack } from "@mui/material";
import { timeConverter } from "../../../utils/StringMethod";

export default function Author(props) {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={1}>
      <UserProfile width="28px" height="28px" src={props.src} alt="User" />
      <Text
        fontSize="12px"
        lineHeight="12px"
        color={props.color ? props.color : "text.main"}
      >
        bởi {props.text}
      </Text>
      <Text
        fontSize="20px"
        lineHeight="20px"
        color={props.color ? props.color : "text.main"}
      >
        &middot;
      </Text>
      <Text
        fontSize="12px"
        lineHeight="12px"
        color={props.color ? props.color : "text.main"}
      >
        {timeConverter(props.time)}
      </Text>
    </Stack>
  );
}
