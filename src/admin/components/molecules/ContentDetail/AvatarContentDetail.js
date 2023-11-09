import { Avatar } from "@mui/material";
import React from "react";

function AvatarContentDetail(props) {
  return (
    <Avatar
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: 40,
        height: 40,
        fontFamily: "Public Sans, sans-serif",
        fontSize: "1.25rem",
        lineHeight: 1,
        borderRadius: "50%",
        overflow: "hidden",
        userSelect: "none",
      }}
      src={props.avatar === null ? "/assets/img/blank.png" : props.avatar}
    />
  );
}

export default AvatarContentDetail;
