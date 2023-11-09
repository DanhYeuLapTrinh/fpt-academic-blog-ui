import React from "react";
import Text from "../../atoms/Text/Text";
import { Box, Stack } from "@mui/material";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Link } from "react-router-dom";
export default function AuthorQA(props) {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={1}>
      <Stack direction={"row"} alignItems={"center"} spacing={"8px"}>
        <Link to={`/profile/${props.userId}`} style={{textDecoration: "none"}}>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <UserProfile width="23px" height="23px" src={props.src} alt="User" />
            <Text
              fontSize="12px"
              lineHeight="12px"
              color={props.color ? props.color : "text.main"}
            >
              bởi {props.label}
            </Text>
          </Stack>
        </Link>
        {!props.pending && (
          <>
            <Text
              fontSize="23px"
              color={props.color ? props.color : "text.main"}
            >
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
          </>
        )}
        <Text fontSize="23px" color={props.color ? props.color : "text.main"}>
          &middot;
        </Text>
        <Text fontSize="12px" color={props.color ? props.color : "text.main"}>
          {props.time}
        </Text>
      </Stack>
    </Stack>
  );
}
