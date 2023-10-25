import React from "react";

export const FormInputValidation = (props) => {
  const { value, regex, errorMessage, formErrors, setFormErrors, fieldName } =
    props;

  if (!regex.test(value)) {
    if (formErrors[fieldName] !== errorMessage) {
      setFormErrors({ ...formErrors, [fieldName]: errorMessage });
    }
  }
};
