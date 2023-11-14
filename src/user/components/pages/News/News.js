import { Container, Stack } from "@mui/material";
import React from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";

export default function News({ news }) {
  return (
    <Container sx={{ pt: "37px", minHeight: "calc(100vh - 93px)" }}>
      <SectionTitle title="Trang xem tin tức" />
      <Stack spacing={1}>
        {news.map((item) => (
          <Link to={`/news/${item.newsId}`} style={{ textDecoration: "none" }}>
            <Stack direction={"row"} spacing={4} key={item.newsId}>
              <Text>{item.newsAt}</Text>
              <Text> - </Text>
              <Text>{item.title}</Text>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
