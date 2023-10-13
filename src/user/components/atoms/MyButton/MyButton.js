import { Button } from "@mui/material";
import {useFormikContext} from 'formik'
import React from "react";

export default function MyButton({children,...props}) {
  const {submitForm} = useFormikContext()

  const handleSubmit = () => {
    submitForm()
  }

  const configBtn = {
    onClick: handleSubmit,
    variant: props.variant,
    disabled: props.disabled,
    fullWidth: true,
    sx: { 
      borderRadius: props.radius, 
      textTransform: "none",
    }
  }
  return (
    <div>
      <Button {...configBtn}>
        {children}
      </Button>
    </div>
  );
}
