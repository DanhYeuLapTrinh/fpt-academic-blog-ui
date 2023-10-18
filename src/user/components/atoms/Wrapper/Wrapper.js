import { Box } from "@mui/material";
import React from "react";

export default function Wrapper({children, ...props }) {
  return (
    <Box
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: props.clamp,
        ...props
      }}
    >
      {children}
    </Box>
  );
}
