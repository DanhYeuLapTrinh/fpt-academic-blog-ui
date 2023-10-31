import React from "react";
import Text from "../../atoms/Text/Text";
import { Box, Stack } from "@mui/material";
import UserProfile from "../../atoms/UserProfile/UserProfile";
export default function AuthorQA(props) {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={1}>
      <Stack direction={"row"} alignItems={"center"} spacing={"8px"}>
        <UserProfile width="23px" height="23px" src={props.src} alt="User" />
        <Text fontSize="23px" color={props.color ? props.color : "text.main"}>
          &middot;
        </Text>
        <Stack direction={"row"} spacing={"4px"}>
          <Text
            fontSize="11px"
            color={props.color ? props.color : "text.main"}
            fontWeight="600"
          >
            {props.text}
          </Text>
          <Text
            fontSize="11px"
            color={props.color ? props.color : "text.main"}
            fontWeight="400"
          >
            câu trả lời
          </Text>
        </Stack>
      </Stack>
      <Text fontSize="23px" color={props.color ? props.color : "text.main"}>
        &middot;
      </Text>
      <Text fontSize="11px" color={props.color ? props.color : "text.main"}>
        30 phút trước
      </Text>
    </Stack>
  );
}