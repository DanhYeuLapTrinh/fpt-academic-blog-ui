import { Typography } from "@mui/material";
import React from "react";

function TitleHeader({ title }) {
  return (
    <Typography
      variant="h4"
      sx={{
        color: "#333",
        fontSize: "24px",
        marginBottom: "20px",
      }}
      component="h4"
      gutterBottom
    >
      {title}
    </Typography>
  );
}

export default TitleHeader;
