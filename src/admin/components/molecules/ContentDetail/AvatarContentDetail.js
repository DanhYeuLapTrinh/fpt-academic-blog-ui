import { Avatar } from "@mui/material";
import React from "react";

function AvatarContentDetail() {
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
      src="https://wallpapers.com/images/hd/aesthetic-anime-boy-icon-houtarou-oreki-sbrd8ilkz3vhk7na.jpg"
    />
  );
}

export default AvatarContentDetail;
