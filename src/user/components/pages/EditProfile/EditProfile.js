import { Container, Stack, TextField } from "@mui/material";
import React from "react";
import Text from "../../atoms/Text/Text";

export default function EditProfile({ profile }) {
  return (
    <Container sx={{ mt: "37px" }}>
      <Text fontSize="40px" fontWeight="600">
        Xin chào, <span style={{ color: "#5927e5" }}>{profile.fullname}</span>
      </Text>
      <Stack spacing={4} m="20px 0">
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Stack spacing={1} width={"50%"}>
            <Text fontSize="16px" fontWeight="400">
              Tên đăng nhập:
            </Text>
            <TextField fullWidth value={"tu"} disabled size="small" />
          </Stack>
          <Stack spacing={1} width={"50%"}>
            <Text fontSize="16px" fontWeight="400">
              Email:
            </Text>
            <TextField fullWidth value="abcd@gmail.com" disabled size="small" />
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} width={"100%"}>
          <Stack spacing={1} width={"50%"}>
            <Text fontSize="16px" fontWeight="400">
              Số điện thoại:
            </Text>
            <TextField fullWidth value={"tu"} disabled size="small" />
          </Stack>
          <Stack spacing={1} width={"50%"}>
            <Text fontSize="16px" fontWeight="400">
              Email:
            </Text>
            <TextField fullWidth value="abcd@gmail.com" disabled size="small" />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
