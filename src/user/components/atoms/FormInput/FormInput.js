import React from "react";
import { Box, TextField } from "@mui/material";
import { useField } from "formik";

export default function FormInput({ name, children, ...props }) {
  const [field, mata] = useField(name);
  const configTextField = {
    ...field,
    ...props,
    spellCheck: false,
    autoFocus: props.autoFocus,
    sx: {
      height: "60px",
      width: "360px",
      fontSize: props.size,
      marginBottom: props.mb,
    },
    variant: props.variant,
    placeholder: props.text,
    InputProps: {
      startAdornment: props.startAdornment,
      endAdornment: props.endAdornment,
    },
  };

  if (mata && mata.touched && mata.error) {
    // Indicates that this has error
    configTextField.error = true;
    // Custom error msg
    configTextField.helperText = mata.error;
  }

  return (
    <Box>
      <TextField {...configTextField}>{children}</TextField>
    </Box>
  );
}
