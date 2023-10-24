import React, { useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import PostFilter from "../../atoms/PostFilter/PostFilter";
import ContentField from "../../organisms/ContentField/ContentField";
import TitleField from "../../organisms/TitleField/TitleField";

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
      <TitleField />
      <Box width={"100%"} height={"220px"} sx={{borderRadius: "10px",border: "3px dashed black", m:"30px 0 20px 0" }}></Box>
      <ContentField />
      <Stack direction={'row'} justifyContent={'flex-end'} spacing={2} paddingTop={'30px'}>
        <Button variant="outlined">Lưu bản nháp</Button>
        <Button variant="contained">Gửi bài</Button>
      </Stack>
    </Container>
  );
}
