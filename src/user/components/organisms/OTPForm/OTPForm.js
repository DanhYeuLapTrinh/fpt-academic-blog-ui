import React, { useContext, useEffect, useState } from "react";
import FormInput from "../../atoms/FormInput/FormInput";
import { Box, Button, InputAdornment, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyButton from "../../atoms/MyButton/MyButton";
import Text from "../../atoms/Text/Text";
import axios from "../../../api/axios";
import { LoginContext } from "../../../context/LoginProvider";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

export default function OTPForm() {
  const { email } = useContext(LoginContext);
  const {setAuth} = useContext(AuthContext)
  const [timer, setTimer] = useState(30);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate()
  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisabled(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [disabled]);

  const resendOTP = async () => {
    try {
      setDisabled(true);
      setTimer(30);
      await axios.post(
        process.env.REACT_APP_SEND_CODE,
        JSON.stringify({
          email: email,
        })
      );
    } catch (error) {
      console.log(error)
    }
  };

  const handleSubmit = async (values, { setFieldError }) => {
    if (values.otp) {
      try {
        const response = await axios.post(
          process.env.REACT_APP_VERIFY_CODE,
          JSON.stringify({
            email: email,
            code: values.otp,
          }),   
        );
        setAuth({token : response?.data?.token})
        values.otp = ""
        navigate("/recover-password")
      } catch (error) {
        if (!error?.response) {
          console.log("No server response");
        } else if (error.response?.status === 400) {
          console.log("Im not understand");
        } else if (error.response?.status === 401) {
          setFieldError("otp", "Sai mã xác nhận");
          values.otp = "";
        } else {
          setFieldError("otp", "Có lỗi trong quá trình xử lý");
          values.otp = "";
        }
      }
    }
  };

  const INITIAL_FORM_STATE = {
    otp: "",
  };

  const FORM_VALIDATION = Yup.object().shape({
    otp: Yup.string().required("Mã xác nhận không thể trống"),
  });
  return (
    <Box sx={{ maxWidth: "360px" }}>
      <Box sx={{marginBottom: '38px'}}>
        <Text
          fontWeight="500"
          fontSize="32px"
          color="text.main"
          marginBottom='5px'
        >
          Nhập mã xác nhận
        </Text>
        <Text
          fontWeight="400"
          fontSize="13px"
          color="text.main"
        >
          Mã xác nhận đã được gửi đến <span style={{fontWeight: '600'}}>{email}</span>
        </Text>
      </Box>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={ handleSubmit}
      >
        <Form>
          <FormInput
            type="text"
            name="otp"
            autoFocus={true}
            text="Mã xác nhận (6 chữ số)"
            size="14px"
            mb="32px"
            startAdornment={
              <InputAdornment position="start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  style={{ padding: "0px 8px" }}
                >
                  <path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z" />
                </svg>
              </InputAdornment>
            }
          />
          <Stack direction={"row"} spacing={2}>
            <Box flex={1}>
              <Button
                onClick={() => resendOTP()}
                variant="outlined"
                fullWidth
                disabled={disabled}
              >
                <Text
                  p="5px 0"
                  fontSize="14px"
                  fontWeight="500"
                  color="text.main"
                >
                  GỬI LẠI {timer !== 0 && `(${timer})`}
                </Text>
              </Button>
            </Box>
            <Box flex={1}>
              <MyButton variant="contained">
                <Text
                  p="5px 0"
                  fontSize="14px"
                  fontWeight="500"
                  color="secondary.main"
                >
                  XÁC NHẬN
                </Text>
              </MyButton>
            </Box>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
}
