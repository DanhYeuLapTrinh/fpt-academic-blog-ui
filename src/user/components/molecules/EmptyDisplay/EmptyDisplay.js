import React from "react";
import Text from "../../atoms/Text/Text";
import { Stack } from "@mui/material";

export default function EmptyDisplay(props) {
  return (
    <Stack alignItems={"center"} sx={{ width: "220px", ...props }}>
      <img src="/assets/img/empty.png" alt="" width={"100%"} height={"100%"} />
      <Text
        textAlign="center"
        fontSize="16px"
        color="lightText.main"
        lineHeight="20px"
      >
        Có vẻ như danh sách này hiện tại chưa có nội dung
      </Text>
    </Stack>
  );
}
