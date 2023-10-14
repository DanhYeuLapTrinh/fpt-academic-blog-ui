import React, { useContext } from "react";
import { Button, IconButton } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../../../api/axios";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
export default function GoogleLoginButton({ children, ...props }) {
  const {setAuth} = useContext(AuthContext)
  const navigate = useNavigate()
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
      const auth = {
        user: serverResponse?.data?.username,
        role: serverResponse?.data?.roleName,
        token: serverResponse?.data?.token
      };
      setAuth(auth)
      navigate("/")
    },
  });

  return (
    <Button onClick={() => login()} {...configGoogleBtn}>
      {children}
    </Button>
  );
}
