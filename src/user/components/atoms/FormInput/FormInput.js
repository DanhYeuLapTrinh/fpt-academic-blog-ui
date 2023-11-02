import React from "react";
import { Box, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

export default function FormInput({ name, children, ...props }) {
  const [field, mata] = useField(name);
  const { submitForm } = useFormikContext();

  const handleKeyUp = (e) => {
    if (e.keyCode == 13) {
      submitForm();
    }
  };

  const configTextField = {
    ...field,
    ...(props.onkeyup && { onKeyUp: handleKeyUp }),
    spellCheck: false,
    autoFocus: props.autoFocus,
    sx: {
      height: props.height ? props.height : "60px",
      width: props.width ? props.width : "360px",
      fontSize: props.size,
      marginBottom: props.mb,
    },
    variant: props.variant,
    placeholder: props.text,
    InputProps: {
      startAdornment: props.startAdornment,
      endAdornment: props.endAdornment,
    },
    ...props,
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
