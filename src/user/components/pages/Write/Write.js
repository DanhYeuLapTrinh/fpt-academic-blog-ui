import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import ContentField from "../../organisms/ContentField/ContentField";
import TitleField from "../../organisms/TitleField/TitleField";
import Dropzone from "../../organisms/Dropzone/Dropzone";

export default function Write() {
  return (
    <Container>
      <PostFilter />
      <TitleField />
      <Dropzone />
      <ContentField />
      <Stack
        direction={"row"}
        justifyContent={"flex-end"}
        spacing={2}
        paddingTop={"30px"}
      >
        <Button variant="outlined">Lưu bản nháp</Button>
        <Button variant="contained">Gửi bài</Button>
      </Stack>
    </Container>
  );
}
