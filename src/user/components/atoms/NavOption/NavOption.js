import { ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function NavOption({ children, ...props }) {
  const configTypo = {
    color: "text.main",
    sx: {
      fontWeight: "500",
      padding: "10px",
    },
  };
  return (
    <Link style={{ textDecoration: "none" }}>
      <ListItemText>
        <Typography {...configTypo}>{children}</Typography>
      </ListItemText>
    </Link>
  );
}
