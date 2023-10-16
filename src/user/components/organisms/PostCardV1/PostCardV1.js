import React from "react";
import Author from "../../molecules/Author/Author";
import PostTag from "../../atoms/PostTag/PostTag";
import Text from "../../atoms/Text/Text";
import { Box, Stack } from "@mui/material";
export default function PostCardV1(props) {
  return (
    <Stack sx={{ width: "100%", height: props.boxHeight }} justifyContent={'space-between'}>
      <Box
        sx={{
          width: "100%",
          height: props.small ? "130px" : "268px",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1696362400167-0af7071b500c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1952&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      />
      <Author />
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        <Text fontSize={props.title} lineHeight={props.small ? "22px" : "26px"}>
          Những khoảnh khắc đáng nhớ trong cuộc hành trình đời
        </Text>
      </Box>
      {props.hasDescription && (
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
        >
          <Text fontWeight="400" fontSize="13px">
            Thiên văn học, bản năng tò mò của con người đối với vũ trụ vô tận,
            đã dẫn đến những khám phá tuyệt vời và bí ẩn đằng sau những điểm
            sáng trên bầu trời đêm. Kính thiên văn, như chiếc cửa sổ mở ra với
            bản đồ sao, giúp chúng ta chiêm ngưỡng những hành tinh xa xôi, những
            tinh tú huyền
          </Text>
        </Box>
      )}
      <Stack direction={"row"} spacing={"12px"}>
        <PostTag color="primary.main"/>
        <PostTag color="primary.main"/>
        <PostTag color="primary.main"/>
      </Stack>
    </Stack>
  );
}
