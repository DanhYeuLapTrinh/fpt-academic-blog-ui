import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Box, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";

export default function Comment(props) {
  return (
    <Stack p={2} direction={"row"} alignItems={"flex-start"} spacing={2}>
      <Box width={"5%"}>
        <UserProfile width="36px" height="36px" />
      </Box>
      <Stack bgcolor={"secondary.alt"} p={1} borderRadius={"10px"}>
        <Text color="primary.main" fontSize="17px">
          Nguyen Huu Danh
        </Text>
        <Text fontWeight="400" fontSize="15px">
          Văn hóa Việt Nam nằm sâu trong tư tưởng Nho giáo, Phật giáo và Đạo
          giáo, và đặt mạnh mẽ sự tôn trọng gia đình, kính trọng người lớn tuổi
          và giá trị cộng đồng. Âm nhạc truyền thống Việt Nam, múa và nghệ thuật
          phản ánh nguồn gốc văn hóa này, và nước này nổi tiếng với các lễ hội
          sôi động và các cuộc kỷ niệm.
        </Text>
      </Stack>
    </Stack>
  );
}
