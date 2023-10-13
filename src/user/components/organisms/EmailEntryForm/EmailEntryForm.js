import React, { useContext } from "react";
import { Box, InputAdornment, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../atoms/FormInput/FormInput";
import MyButton from "../../atoms/MyButton/MyButton";
import axios from "../../../api/axios";
import { LoginContext } from "../../../context/LoginProvider";
import { useNavigate } from "react-router-dom";
export default function EmailEntryForm() {
  const { setEmail } = useContext(LoginContext);
  const navigate = useNavigate();
  const INITIAL_FORM_STATE = {
    email: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được bỏ trống"),
  });

  const handleSubmit = async (values, { setFieldError }) => {
    if (values.email) {
      setEmail(values.email);
      try {
        await axios.post(
          "users/send-code",
          JSON.stringify({
            email: values.email,
          })
        );
        values.email = "";
        navigate("/otp");
      } catch (error) {
        if (!error?.response) {
          console.log("No server response");
        } else if (error.response?.status === 400) {
          console.log("Im not understand");
        } else if (error.response?.status === 401) {
          setFieldError("email", "Không tìm thấy tài khoản");
          values.email = "";
        } else {
          setFieldError("password", "Thất bại");
          values.email = "";
        }
      }
    }
  };
  return (
    <Box sx={{ maxWidth: "360px" }}>
      <Stack alignItems={"flex-start"} style={{ maxWidth: "360px" }}>
        <Text fontSize="32px" fontWeight="500" marginBottom="10px">
          Tìm tài khoản của bạn
        </Text>
        <Text
          fontSize="16px"
          fontWeight="400"
          marginBottom="40px"
        >
          Vui lòng nhập email đã đăng ký tại{" "}
          <span
            style={{
              fontSize: "17px",
              fontWeight: "500",
              color: "#5927e5",
              fontFamily: "Klavika",
            }}
          >
            fblog.com
          </span>{" "}
          để tìm kiếm tài khoản của bạn.
        </Text>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSubmit}
        >
          <Form>
            <FormInput
              name="email"
              autoFocus={true}
              text="example@gmail.com"
              size="14px"
              type="text"
              mb="28px"
              startAdornment={
                <InputAdornment position="start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 0 512 512"
                    fill="#444746"
                    style={{ padding: "0px 8px" }}
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                </InputAdornment>
              }
            />
            <MyButton variant="contained">
              <Text
                p="5px 0"
                fontSize="14px"
                fontWeight="500"
                color="secondary.main"
              >
                GỬI MÃ XÁC NHẬN
              </Text>
            </MyButton>
          </Form>
        </Formik>
      </Stack>
    </Box>
  );
}
