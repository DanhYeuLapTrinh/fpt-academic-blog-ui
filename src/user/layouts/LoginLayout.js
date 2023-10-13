import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import Text from "../components/atoms/Text/Text";

export default function LoginLayout({ children }) {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100vh",
        flexWrap: "wrap",
      }}
    >
      <Stack sx={{ width: "500px" }}>
        <Typography
          sx={{
            fontFamily: "Klavika",
            fontSize: "70px",
            color: "primary.main",
          }}
        >
          fblog.com
        </Typography>
        <Text
          sx={{
            fontSize: "25px",
            color: "text.main",
            lineHeight: "32px",
            fontWeight: "400",
          }}
        >
          Fblog giúp bạn kết nối và chia sẻ với sinh viên, giảng viên thuộc
          trường Đại học FPT.
        </Text>
      </Stack>
      <div>{children}</div>
    </Container>
  );
}
