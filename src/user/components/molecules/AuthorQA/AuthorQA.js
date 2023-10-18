import React from "react";
import Text from "../../atoms/Text/Text";
import { Stack } from "@mui/material";
export default function AuthorQA(props) {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center"}} spacing={1}>
      <Stack direction={"row"} alignItems={"center"} spacing={"2px"}>
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
      <Text fontSize="23px" color={props.color ? props.color : "text.main"}>
        &middot;
      </Text>
      <Text fontSize="11px" color={props.color ? props.color : "text.main"}>
        30 phút trước
      </Text>
    </Stack>
  );
}
