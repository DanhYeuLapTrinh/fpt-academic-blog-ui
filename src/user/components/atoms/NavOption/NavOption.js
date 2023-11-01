import { ListItemText, Typography } from "@mui/material";
import React from "react";

export default function NavOption({ children }) {
  const configTypo = {
    color: "text.main",
    sx: {
      fontWeight: "500",
      padding: "10px",
    },
  };
  return <Typography {...configTypo}>{children}</Typography>;
}
