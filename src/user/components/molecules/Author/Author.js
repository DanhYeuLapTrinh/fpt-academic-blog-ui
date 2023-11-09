import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import Text from "../../atoms/Text/Text";
import { Stack } from "@mui/material";
import { timeConverter } from "../../../utils/StringMethod";
import { Link } from "react-router-dom";

export default function Author(props) {
  return (
    <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={"10px"}>
      <Link to={`/profile/${props.profile}`} style={{ textDecoration: "none" }}>
        <Stack direction={"row"} alignItems={"center"} spacing={"10px"}>
          <UserProfile
            width={props.avatarWidth ? props.avatarWidth : "28px"}
            height={props.avatarHeight ? props.avatarHeight : "28px"}
            src={props.src}
            alt="User"
          />
          <Text
            fontSize={props.authorSize ? props.authorSize : "12px"}
            color={props.color ? props.color : "text.main"}
          >
            {props.text}
          </Text>
        </Stack>
      </Link>
      <Stack>
        <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={"10px"}>
          <Text
            fontSize="24px"
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
      </Stack>
    </Stack>
  );
}
