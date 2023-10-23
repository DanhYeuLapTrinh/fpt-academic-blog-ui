import React from "react";
import { Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
export default function Write() {
  return (
    <Container sx={{ p: "30px 0" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <PostFilter />
      </Stack>
    </Container>
  );
}
