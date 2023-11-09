import {
  Box,
  CircularProgress,
  Divider,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import FormInput from "../../atoms/FormInput/FormInput";
import MyButton from "../../atoms/MyButton/MyButton";
import GoogleLoginButton from "../../atoms/GoogleLoginButton/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Text from "../../atoms/Text/Text";
import axios from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useHome from "../../../hooks/useHome";
import { toast } from "react-toastify";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, setIsLoading } = useHome();
  const navigate = useNavigate();
  const INITIAL_FORM_STATE = {
    username: "",
    password: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    username: Yup.string().required("Tên đăng nhập không được bỏ trống."),
    password: Yup.string().required("Mật khẩu không được bỏ trống."),
  });

  const handleClick = () => {
    setShowPassword((prevData) => !prevData);
  };

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      setIsLoading(true);
      const response = await axios.post(process.env.REACT_APP_LOGIN_API, {
        username: values.username,
        password: values.password,
      });
      if (response?.data?.isBanned)
        throw new Error("Tài khoản không được phép đăng nhập vào hệ thống");
      const auth = {
        id: response?.data?.id,
        user: response?.data?.username,
        role: response?.data?.roleName,
        token: response?.data?.token,
        refreshToken: response?.data?.refreshToken,
        profileURL: response?.data?.profileURL,
        coverURL: response?.data?.coverURL,
      };
      localStorage.setItem("auth", JSON.stringify(auth));
      values.username = "";
      values.password = "";
      if (auth?.role === "admin") {
        navigate("/welcome", { replace: true });
      } else navigate("/", { replace: true });
    } catch (error) {
      if (
        error.message === "Tài khoản không được phép đăng nhập vào hệ thống"
      ) {
        toast.error(error.message);
        values.username = "";
        values.password = "";
      } else if (!error?.response) {
        toast.error("Có lỗi trong quá trình xử lý");
        values.username = "";
        values.password = "";
      } else if (error.response?.status === 400) {
        console.log("Im not understand");
      } else if (error.response?.status === 401) {
        setFieldError("password", "Sai thông tin tài khoản");
        values.password = "";
      } else {
        toast.error("Đăng nhập thất bại");
        values.username = "";
        values.password = "";
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "360px" }}>
      <Text
        fontWeight="500"
        fontSize="32px"
        color="text.main"
        marginBottom="42px"
      >
        Đăng nhập
      </Text>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormInput
            name="username"
            autoFocus={true}
            text="Tên đăng nhập"
            size="14px"
            type="text"
            mb="32px"
            startAdornment={
              <InputAdornment position="start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22px"
                  fill="#444746"
                  viewBox="0 0 448 512"
                  style={{ padding: "0px 8px" }}
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </InputAdornment>
            }
          />
          <Stack sx={{ mb: "32px" }}>
            <FormInput
              name="password"
              onkeyup
              text="Mật khẩu"
              size="14px"
              type={showPassword ? "text" : "password"}
              peek={true}
              handleClick={handleClick}
              showPassword={showPassword}
              startAdornment={
                <InputAdornment position="start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    fill="#444746"
                    viewBox="0 0 448 512"
                    style={{ padding: "0px 8px" }}
                  >
                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                  </svg>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment
                  onClick={handleClick}
                  position="end"
                  sx={{
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  <Typography sx={{ fontSize: "13px", cursor: "pointer" }}>
                    {showPassword ? "ẩn" : "xem"}
                  </Typography>
                </InputAdornment>
              }
            />
            <Link to={"/email-entry"} style={{ textDecoration: "none" }}>
              <Text
                fontSize="12px"
                width="100%"
                display="flex"
                justifyContent="flex-end"
                color="primary.main"
                fontWeight="500"
                padding="4px"
                cursor="pointer"
              >
                Quên mật khẩu?
              </Text>
            </Link>
          </Stack>
          <MyButton variant="contained" disabled={isLoading}>
            {!isLoading ? (
              <Text
                p="5px 0"
                fontSize="14px"
                fontWeight="500"
                color="secondary.main"
              >
                Đăng nhập
              </Text>
            ) : (
              <CircularProgress
                sx={{ m: "5.5px 0", color: "white" }}
                size={20}
              />
            )}
          </MyButton>
        </Form>
      </Formik>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ margin: "16px 0" }}
      >
        <Divider sx={{ width: "40%" }} />
        <Text fontWeight="400" fontSize="14px" color="lightText.main">
          hoặc
        </Text>
        <Divider sx={{ width: "40%" }} />
      </Stack>
      <GoogleOAuthProvider clientId="106073710411-1jh8esrn0ek1k99t9rlgp5u6pmtiaedp.apps.googleusercontent.com">
        <GoogleLoginButton variant="outlined" color="middleText.main">
          <Text p="5px 0" fontSize="14px" fontWeight="500">
            Tiếp tục với Google
          </Text>
        </GoogleLoginButton>
      </GoogleOAuthProvider>
    </Box>
  );
}
