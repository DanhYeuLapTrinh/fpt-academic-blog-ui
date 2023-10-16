import { Box, Stack } from "@mui/material";
import React from "react";
import Author from "../../molecules/Author/Author";
import Text from "../../atoms/Text/Text";
import PostTag from "../../atoms/PostTag/PostTag";

export default function PostCardV2(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "492px",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1696362400167-0af7071b500c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1952&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
      }}
    >
      <Author color="secondary.main" />
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          paddingTop: '10px'
        }}
      >
        <Text fontSize={props.title} color="secondary.main" lineHeight="36px">
          Những khoảnh khắc đáng nhớ trong cuộc hành trình đời
        </Text>
      </Box>
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          paddingTop: '10px'
        }}
      >
        <Text fontWeight="400" fontSize="13px" color="secondary.main">
          Thiên văn học, bản năng tò mò của con người đối với vũ trụ vô tận, đã
          dẫn đến những khám phá tuyệt vời và bí ẩn đằng sau những điểm sáng
          trên bầu trời đêm. Kính thiên văn, như chiếc cửa sổ mở ra với bản đồ
          sao, giúp chúng ta chiêm ngưỡng những hành tinh xa xôi, những tinh tú
          huyền
        </Text>
      </Box>
      <Stack direction={"row"} spacing={"12px"} paddingTop={'15px'}>
        <PostTag color="secondary.main"/>
        <PostTag color="secondary.main"/>
        <PostTag color="secondary.main"/>
      </Stack>
    </Box>
  );
}
