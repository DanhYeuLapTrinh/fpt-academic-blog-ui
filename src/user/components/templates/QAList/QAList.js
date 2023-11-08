import { Box, Stack } from "@mui/material";
import React from "react";
import QA from "../../organisms/QA/QA";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import Text from "../../atoms/Text/Text";

export default function QAList() {
  return (
    <Box width={"740px"}>
      <SectionTitle title="Hỏi & Đáp" />
      <Stack spacing={"20px"}>
        <QA />
        <QA />
        <QA />
        <QA />
        <QA />
        <Box
          sx={{
            width: "100%",
            height: "39px",
            bgcolor: "secondary.alt",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text fontSize="12px" color="primary.main">
            Xem thêm
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}
