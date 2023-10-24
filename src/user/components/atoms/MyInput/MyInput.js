import { InputAdornment, TextField } from "@mui/material";
import React from "react";

export default function MyInput({ ...props }) {
  const config = {
    ...props,
    spellCheck: false,
    sx: {
      height: props.h,
      width: props.w,
      fontSize: props.size,
      marginBottom: props.mb
    },
    variant: props.variant ? props.variant : "outlined",
    placeholder: props.text,
    InputProps: {
      startAdornment: (
        <InputAdornment position="start">{props.icon}</InputAdornment>
      ),
      disableUnderline: props.disableUnderline
    },
  };
  return <TextField {...config} />;
}
