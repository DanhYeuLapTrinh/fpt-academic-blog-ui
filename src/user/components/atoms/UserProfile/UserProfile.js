import { Box } from "@mui/material";
import React from "react";

export default function UserProfile({ ...props }) {
  const configContainer = {
    width: "36px",
    height: "36px",
    sx: {
      borderRadius: '50px',
    },
    ...props,
  };
  const configPic = {
    width: "100%",
    height: "100%",
    style: {
      borderRadius: '50px'
    },
    src: props.src
  };
  return (
    <Box {...configContainer}>
      <img {...configPic} alt={props.alt}/>
    </Box>
  );
}
