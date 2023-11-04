import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Stack } from "@mui/material";

export default function MyComment(props) {
  return (
    <Stack>
      <UserProfile
        width={props.avatarWidth ? props.avatarWidth : "28px"}
        height={props.avatarHeight ? props.avatarHeight : "28px"}
        src={props.src}
        alt="User"
      />
      
    </Stack>
  );
}
