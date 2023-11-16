import React from "react";
import { Typography } from "@mui/material";

function CategoryTitle({ title }) {
  return (
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        marginBottom: 2,
        height: 45,
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ccc",
        margin: 2,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        color: "#333",
      }}
    >
      {title}
    </Typography>
  );
}

export default CategoryTitle;
