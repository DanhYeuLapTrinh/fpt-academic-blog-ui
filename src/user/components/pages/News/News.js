import { Container } from "@mui/material";
import React from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";

export default function News({news}) {
  return (
    <Container sx={{pt: "37px"}}>
      <SectionTitle title="Trang xem tin tức" />
      {news.map((item) => (
        <div>1</div>
      ))}
    </Container>
  );
}
