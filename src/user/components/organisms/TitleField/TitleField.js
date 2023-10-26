import { TextField } from "@mui/material";
import React from "react";

export default function TitleField() {
  return (
    <TextField
      variant="standard"
      placeholder="Nhập tiêu đề bài viết..."
      fullWidth
      InputProps={{
        disableUnderline: "true",
        sx: {
          fontSize: "40px",
          fontWeight: "600",
          padding: "12px",
          color: "text.main"
        },
      }}
      multiline
    />
  );
}
