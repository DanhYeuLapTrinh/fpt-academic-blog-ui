import { Box, Stack } from "@mui/material";
import React from "react";
import Author from "../../molecules/Author/Author";
import Text from "../../atoms/Text/Text";
import PostTag from "../../atoms/PostTag/PostTag";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import { getFirstChar, toSlug } from "../../../utils/StringMethod";
import { Link } from "react-router-dom";

export default function PostCardShort(props) {
  return (
    <Link to={`/view/${props.slug}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          width: "calc(100% - 20px)/2",
          height: props.height,
          backgroundImage: `url(${props.url})`,
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
            {props.postTitle}
          </Text>
        </Wrapper>
        <Stack
          direction={"row"}
          justifyContent={"flex-start"}
          gap={"10px"}
          width={"100%"}
          paddingTop={"15px"}
        >
          <Link
            to={{
              pathname: "/categories",
              search: `?name=${toSlug(props.majorName, true)}&id=${
                props.majorID
              }`,
            }}
            style={{ textDecoration: "none" }}
          >
            <PostTag
              fontSize="10px"
              text={getFirstChar(props.majorName)}
              color={props.tagColor ? props.tagColor : "secondary.main"}
            />
          </Link>
          <Link
            to={{
              pathname: "/categories",
              search: `?name=${toSlug(props.subjectName, true)}&id=${
                props.subjectID
              }`,
            }}
            style={{ textDecoration: "none" }}
          >
            <PostTag
              fontSize="10px"
              text={props.subjectName}
              color={props.tagColor ? props.tagColor : "secondary.main"}
            />
          </Link>
          <Link
            to={{
              pathname: "/tags",
              search: `?name=${toSlug(props.tagName, true)}&id=${props.tagID}`,
            }}
            style={{ textDecoration: "none" }}
          >
            <PostTag
              fontSize="10px"
              text={props.tagName}
              color={props.tagColor ? props.tagColor : "secondary.main"}
            />
          </Link>
        </Stack>
      </Box>
    </Link>
  );
}
