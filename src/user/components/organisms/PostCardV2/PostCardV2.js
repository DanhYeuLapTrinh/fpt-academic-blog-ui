import { Box, Stack } from "@mui/material";
import React from "react";
import Author from "../../molecules/Author/Author";
import Text from "../../atoms/Text/Text";
import PostTag from "../../atoms/PostTag/PostTag";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import RewardBadge from "../../atoms/RewardBadge/RewardBadge";
import { Link } from "react-router-dom";
import { getFirstChar, toSlug } from "../../../utils/StringMethod";

export default function PostCardV2(props) {
  return (
    <Link to={`/view/${props.slug}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          width: "100%",
          height: props.height,
          backgroundImage: `url(${props.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          padding: "25px",
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
              "linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, .9))",
            zIndex: -1,
            borderRadius: "10px",
          }}
        >
          {props.isRewarded && (
            <Link to={"/rewarded"}>
              <RewardBadge
                small={props.small}
                position="absolute"
                top="10px"
                right="10px"
                zIndex="999"
              />
            </Link>
          )}
        </Box>
        <Author
          src={props.src}
          author={true}
          text={props.label}
          color="secondary.main"
          time={props.time}
          profile={props.userId}
        />
        <Wrapper WebkitLineClamp="2" paddingTop="10px">
          <Text fontSize={props.title} color="secondary.main" lineHeight="36px">
            {props.postTitle}
          </Text>
        </Wrapper>
        <Wrapper WebkitLineClamp={props.clamp} paddingTop="10px">
          <Text fontWeight="400" fontSize="14px" color="secondary.main">
            {props.description}
          </Text>
        </Wrapper>
        <Stack direction={"row"} spacing={"12px"} paddingTop={"15px"}>
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
              text={props.tagName}
              color={props.tagColor ? props.tagColor : "secondary.main"}
            />
          </Link>
        </Stack>
      </Box>
    </Link>
  );
}
