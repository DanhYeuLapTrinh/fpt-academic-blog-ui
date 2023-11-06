import {Typography } from "@mui/material";
import React from "react";

export default function NavOption({ children, ...props }) {
  const configTypo = {
    color: "text.main",
    sx: {
      fontWeight: props.fontWeight ? props.fontWeight : "500",
    },
    ...props,
  };
  return <Typography {...configTypo}>{children}</Typography>;
}
