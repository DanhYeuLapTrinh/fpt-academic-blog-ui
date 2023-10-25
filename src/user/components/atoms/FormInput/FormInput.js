import React from "react";
import { Box, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";

export default function FormInput({ name, children, ...props }) {
  const [field, mata] = useField(name);
  const {submitForm} = useFormikContext()

  const handleKeyUp = (e) => {
    if(e.keyCode == 13) {
      submitForm()
    }
  }
  // bị double phần gửi mail vì 1 ô nên mặc định là enter rồi

  const configTextField = {
    ...field,
    ...props,
    onKeyUp: handleKeyUp,
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
