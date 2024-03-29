import { Box, Container, Stack } from "@mui/material";
import React from "react";
import SectionTitle from "../../molecules/SectionTitle/SectionTitle";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import EmptyDisplay from "../../molecules/EmptyDisplay/EmptyDisplay";

export default function News({ news }) {
  return (
    <Container sx={{ pt: "37px", minHeight: "calc(100vh - 93px)" }}>
      <SectionTitle title="Trang xem tin tức" />
      {news?.length === 0 && (
        <Stack>
          <EmptyDisplay alignSelf="center" mt="140px" />
        </Stack>
      )}
      <Stack spacing={1.5}>
        {news.map((item) => (
          <Link to={`/news/${item.newsId}`} style={{ textDecoration: "none" }}>
            <Stack
              direction={"row"}
              key={item.newsId}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box
                width={"15%"}
                sx={{
                  bgcolor: "primary.main",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: "4px 0",
                  borderRadius: "10px",
                }}
              >
                <Text color="secondary.main">{item.newsAt}</Text>
              </Box>
              <Box width={"5%"} sx={{ textAlign: "center" }}>
                <Text> - </Text>
              </Box>
              <Box width={"80%"}>
                <Text>{item.title}</Text>
              </Box>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Container>
  );
}
