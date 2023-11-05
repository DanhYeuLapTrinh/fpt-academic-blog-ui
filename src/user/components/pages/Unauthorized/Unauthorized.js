import { Box, Button, IconButton, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Text from "../../atoms/Text/Text";
import useAuth from "../../../hooks/useAuth";

export default function Unauthorized() {
  const navigate = useNavigate();
  const auth = useAuth();
  const goHome = () => {
    if (auth.token) {
      navigate("/", { replace: true });
    } else navigate("/login", { replace: true });
  };
  const goBack = () => navigate(-1);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack alignItems={"center"} sx={{ width: "450px" }} spacing={3}>
        <Stack alignItems={"center"}>
          <img
            src="../assets/img/404-not-found.png"
            alt="404-not-found"
            width={"100%"}
          />
          <Text fontSize="20px" fontWeight="600">
            Bạn hiện không xem được nội dung này
          </Text>
          <Text align="center" fontSize="16px" fontWeight="400">
            Lỗi này thường do người sở hữu chỉ cho phép người có thẩm quyền truy
            cập hoặc nội dung đã bị xóa.
          </Text>
        </Stack>
        <Stack alignItems={"center"} spacing={1}>
          <Button
            variant="contained"
            onClick={goHome}
            sx={{ textTransform: "none" }}
          >
            Đi tới Trang chủ
          </Button>
          <IconButton
            disableFocusRipple
            disableRipple
            disableTouchRipple
            onClick={goBack}
          >
            <Text color="primary.main">Quay lại</Text>
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
