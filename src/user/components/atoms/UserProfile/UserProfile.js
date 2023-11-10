import { Box, IconButton } from "@mui/material";

import React from "react";
export default function UserProfile({ ...props }) {
  const configContainer = {
    width: "36px",
    height: "36px",
    sx: {
      borderRadius: "50px",
      backgroundImage: `url(${props.src ?? "/assets/img/blank.png"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: "50px",
      position: "relative",
      cursor: "pointer",
    },
    ...props,
  };
  return <Box {...configContainer} onClick={props.handleClick} />;
}
