import React from "react";
import Author from "../../molecules/Author/Author";
import PostTag from "../../atoms/PostTag/PostTag";
import Text from "../../atoms/Text/Text";
import { Box, Stack } from "@mui/material";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import RewardBadge from "../../atoms/RewardBadge/RewardBadge";
import { Link } from "react-router-dom";
import { getFirstChar, toSlug } from "../../../utils/StringMethod";
export default function PostCardV1(props) {
  return (
    <Link to={`/view/${props.slug}`} style={{ textDecoration: "none" }}>
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
            position: "relative",
          }}
        >
          {props.isRewarded && (
            <Link to={"/rewarded"}>
              <RewardBadge
                small={props.small}
                position="absolute"
                top="10px"
                right="10px"
                zIndex="1"
              />
            </Link>
          )}
        </Box>
        {!props.noAuthor && (
          <Author
            src={props.src}
            author={true}
            text={props.label}
            color={props.authorColor}
            time={props.time}
            profile={props.userId}
          />
        )}
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
              text={getFirstChar(props.majorName)}
              color={props.tagColor ? props.tagColor : "primary.main"}
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
              text={props.subjectName}
              color={props.tagColor ? props.tagColor : "primary.main"}
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
              text={props.tagName}
              color={props.tagColor ? props.tagColor : "primary.main"}
            />
          </Link>
        </Stack>
      </Stack>
    </Link>
  );
}
