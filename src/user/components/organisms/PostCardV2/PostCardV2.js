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
            <RewardBadge
              small={props.small}
              position="absolute"
              top="15px"
              right="15px"
              zIndex="999"
            />
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
          <PostTag
            text={getFirstChar(props.major)}
            color={props.tagColor ? props.tagColor : "secondary.main"}
            link={toSlug(props.major, true)}
          />
          <PostTag
            text={props.subject}
            color={props.tagColor ? props.tagColor : "secondary.main"}
            link={toSlug(props.subject, true)}
          />
          <PostTag
            text={props.tag}
            color={props.tagColor ? props.tagColor : "secondary.main"}
            link={toSlug(props.tag, true)}
          />
        </Stack>
      </Box>
    </Link>
  );
}
