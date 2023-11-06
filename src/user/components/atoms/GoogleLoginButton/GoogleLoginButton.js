import React from "react";
import { Button, IconButton } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function GoogleLoginButton({ children, ...props }) {
  const navigate = useNavigate();
  const configGoogleBtn = {
    ...props,
    variant: props.variant,
    color: "text",
    fullWidth: true,
    sx: { textTransform: "none" },
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
      try {
        const serverResponse = await axios.post(
          process.env.REACT_APP_LOGIN_GOOGLE,
          JSON.stringify({ email: response.access_token }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const auth = {
          id: serverResponse?.data?.id,
          user: serverResponse?.data?.username,
          role: serverResponse?.data?.roleName,
          token: serverResponse?.data?.token,
          refreshToken: serverResponse?.data?.refreshToken,
          profileURL: serverResponse?.data?.profileURL ?? "",
          coverURL: serverResponse?.data?.coverURL,
        };
        localStorage.setItem("auth", JSON.stringify(auth));
        navigate("/", { replace: true });
      } catch (error) {
        toast.error("Đăng nhập thất bại");
      }
    },
  });

  return (
    <Button onClick={() => login()} {...configGoogleBtn}>
      {children}
    </Button>
  );
}
