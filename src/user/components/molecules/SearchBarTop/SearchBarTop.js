import React from "react";
import Text from "../../atoms/Text/Text";
import { Stack } from "@mui/material";

export default function SearchBarTop() {
  return (
    <Stack alignItems={"center"}>
      <Text fontSize="40px" fontWeight="400">
        Chào mừng bạn đến với,{" "}
        <span
          style={{ fontFamily: "Klavika", fontSize: "40px", color: "#5927e5" }}
        >
          fblog
        </span>
      </Text>
      <Text fontWeight="400" fontSize="14px">
        Trang thông tin số 1 dành cho sinh viên, giảng viên thuộc trường Đại học
        FPT.
      </Text>
    </Stack>
  );
}
