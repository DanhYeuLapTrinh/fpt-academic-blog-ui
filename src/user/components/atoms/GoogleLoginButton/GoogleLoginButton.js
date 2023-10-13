import React from "react";
import { Button, IconButton } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../../../api/axios";
export default function GoogleLoginButton({ children, ...props }) {
  const configGoogleBtn = {
    ...props,
    variant: props.variant,
    color: "text",
    fullWidth: true,
    sx: {textTransform: "none" },
    startIcon: (
      <IconButton sx={{ width: "20px", p: 0 }}>
        <img
          src="assets/img/google.png"
          alt="Google"
          style={{ width: "100%" }}
        />
      </IconButton>
    ),
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      const serverResponse = await axios.post(
        "users/google-login",
        JSON.stringify({ email: response.access_token }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      localStorage.setItem("access_token", serverResponse.data.token);
      console.log(response.access_token);
    },
  });

  return (
    <Button onClick={() => login()} {...configGoogleBtn}>
      {children}
    </Button>
  );
}
