import { Box } from "@mui/material";
import React from "react";

export default function UserProfile({ ...props }) {
  const configContainer = {
    width: "36px",
    height: "36px",
    sx: {
      borderRadius: "50px",
    },
    cursor: "pointer",
    ...props,
  };
  const configPic = {
    style: {
      borderRadius: "50px",
      width: "100%",
      height: "100%",
      cursor: "pointer",
    },
    src: props.src,
  };
  return (
    <Box {...configContainer} onClick={props.onClick}>
      <img {...configPic} alt={props.alt} />
    </Box>
  );
}
