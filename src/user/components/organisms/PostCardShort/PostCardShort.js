import { Box, Stack } from "@mui/material";
import React from "react";
import Author from "../../molecules/Author/Author";
import Text from "../../atoms/Text/Text";
import PostTag from "../../atoms/PostTag/PostTag";
import Wrapper from "../../atoms/Wrapper/Wrapper";

export default function PostCardShort(props) {
  return (
    <Box
      sx={{
        width: "calc(100% - 20px)/2",
        height: props.height,
        backgroundImage:
          'url("https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2008&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.6))",
          zIndex: -1,
          borderRadius: "10px",
        }}
      />
      <Wrapper WebkitLineClamp="2" paddingTop="10px">
        <Text fontSize={props.title} color="secondary.main" lineHeight="20px">
          Những khoảnh khắc đáng nhớ trong cuộc hành trình đời
        </Text>
      </Wrapper>
      <Stack
        direction={"row"}
        justifyContent={"flex-start"}
        gap={'10px'}
        width={"100%"}
        paddingTop={"15px"}
      >
        <PostTag fontSize="9px" color="secondary.main" />
        <PostTag fontSize="9px" color="secondary.main" />
        <PostTag fontSize="9px" color="secondary.main" />
      </Stack>
    </Box>
  );
}
