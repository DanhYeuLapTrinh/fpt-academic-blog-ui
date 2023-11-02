import React from "react";
import Author from "../../molecules/Author/Author";
import PostTag from "../../atoms/PostTag/PostTag";
import Text from "../../atoms/Text/Text";
import { Box, Stack } from "@mui/material";
import Wrapper from "../../atoms/Wrapper/Wrapper";
export default function PostCardV1(props) {
  return (
    <Stack
      sx={{ width: props.boxWidth, height: props.boxHeight }}
      justifyContent={"space-between"}
    >
      <Box
        sx={{
          width: "100%",
          height: props.h ? props.h : "268px",
          backgroundImage: `url(${props.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
        }}
      />
      <Author
        src={props.src}
        author={true}
        text={props.label}
        color={props.authorColor}
        time={props.time}
      />
      <Wrapper WebkitLineClamp="2">
        <Text
          fontSize={props.title}
          lineHeight={props.small ? "22px" : "26px"}
          color={props.color}
        >
          {props.postTitle}
        </Text>
      </Wrapper>
      {props.hasDescription && (
        <Wrapper WebkitLineClamp="4">
          <Text fontWeight="400" fontSize="13px" color={props.color}>
            {props.description}
          </Text>
        </Wrapper>
      )}
      <Stack direction={"row"} spacing={"12px"}>
        <PostTag
          text={props.major}
          color={props.tagColor ? props.tagColor : "primary.main"}
        />
        <PostTag
          text={props.subject}
          color={props.tagColor ? props.tagColor : "primary.main"}
        />
        <PostTag
          text={props.tag}
          color={props.tagColor ? props.tagColor : "primary.main"}
        />
      </Stack>
    </Stack>
  );
}
