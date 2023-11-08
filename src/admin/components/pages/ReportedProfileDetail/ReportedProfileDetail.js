import React from "react";
import BodyDetail from "../../organisms/ReportedProfileDetail/BodyDetail";
import { Box, Container } from "@mui/material";
import TitleHeader from "../../atoms/TitleHeader/TitleHeader";
import ContentDetail from "../../organisms/ReportedProfileDetail/ContentDetail";
import "./styles.scss";

function ReportedProfileDetail() {
  return (
    <Box
      sx={{
        "-webkit-box-flex": 1,
        flexGrow: 1,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        width: "calc(100% - 10px)",
      }}
    >
      <Container className="container">
        <TitleHeader title="Hồ sơ" />
        <BodyDetail />
        <ContentDetail />
      </Container>
    </Box>
  );
}

export default ReportedProfileDetail;
