import React, { useContext, useState } from "react";
import FormInput from "../../atoms/FormInput/FormInput";
import { Box, InputAdornment, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyButton from "../../atoms/MyButton/MyButton";
import Text from "../../atoms/Text/Text";
import axios from "../../../api/axios";
import { LoginContext } from "../../../context/LoginProvider";
import { useNavigate } from "react-router-dom";

export default function RecoverPasswordForm() {
  const { email } = useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    setShowPassword((prevData) => !prevData);
  };
  const navigate = useNavigate();
  const INITIAL_FORM_STATE = {
    password: "",
    confirm: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    password: Yup.string().required("Mật khẩu mới không thể trống"),
    confirm: Yup.string().required("Xác nhận mật khẩu không thể trống"),
  });

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      if (values.password && values.confirm) {
        try {
          if (values.password !== values.confirm) throw new Error();
          await axios.post(
            "users/reset-password",
            JSON.stringify({
              email: email,
              password: values.password,
            }),
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          values.password = "";
          values.confirm = "";
          navigate("/login");
        } catch (error) {
          if (values.password !== values.confirm) {
            setFieldError("confirm", "Mật khẩu không trùng nhau");
            values.confirm = "";
          } else if (!error?.response) {
            setFieldError("confirm", "Không thể kết nối với sever");
            values.password = "";
            values.confirm = "";
          } else if (error.response?.status === 400) {
            console.log("Im not understand");
          } else {
            setFieldError("confirm", "Có lỗi trong quá trình xử lý");
            values.otp = "";
          }
        }
      }
    } catch (error) {
      if (values.password !== values.confrim) {
        setFieldError("confirm", "Mật khẩu không trùng nhau");
        values.confirm = "";
      }
    }
  };

  return (
    <Box sx={{ maxWidth: "360px" }}>
      <Text fontWeight="500" fontSize="32px" color="text.main">
        Nhập mật khẩu mới
      </Text>
      <Text
        fontWeight="400"
        fontSize="14px"
        color="text.main"
        marginBottom="38px"
      >
        Mật khẩu này sẽ được sử dụng cho tài khoản của bạn.
      </Text>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormInput
            type={showPassword ? "text" : "password"}
            name="password"
            autoFocus={true}
            text="Nhập mật khẩu mới"
            size="14px"
            mb="32px"
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
          <FormInput
            type="password"
            name="confirm"
            text="Xác nhận mật khẩu"
            size="14px"
            mb="20px"
          />

          <MyButton variant="contained">
            <Text
              p="5px 0"
              fontSize="14px"
              fontWeight="500"
              color="secondary.main"
            >
              ĐỔI MẬT KHẨU
            </Text>
          </MyButton>
        </Form>
      </Formik>
    </Box>
  );
}
