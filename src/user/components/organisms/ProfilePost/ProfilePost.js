import { Box, Stack } from "@mui/material";
import React from "react";
import RewardBadge from "../../atoms/RewardBadge/RewardBadge";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import Text from "../../atoms/Text/Text";
import PostTag from "../../atoms/PostTag/PostTag";
import {
  getFirstChar,
  timeConverter,
  toSlug,
} from "../../../utils/StringMethod";
import { Link } from "react-router-dom";

export default function ProfilePost(props) {
  return (
    <Link to={`/view/${props.slug}`} style={{ textDecoration: "none" }}>
      <Stack direction={"row"} gap={"20px"}>
        <Box
          sx={{
            width: "241px",
            height: "149px",
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
                top="15px"
                right="15px"
                zIndex="999"
              />
            </Link>
          )}
        </Box>
        <Box width={"calc(100% - 261px)"}>
          <Stack justifyContent={"space-between"} height={"100%"}>
            <Wrapper WebkitLineClamp="2">
              <Text
                fontSize={props.title}
                lineHeight={"32px"}
                color={props.color}
              >
                {props.postTitle}
              </Text>
            </Wrapper>
            <Wrapper WebkitLineClamp="2">
              <Text fontWeight="400" fontSize="14px">
                {props.description}
              </Text>
            </Wrapper>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack direction={"row"} spacing={1}>
                <Text fontSize="12px">Nằm trong: </Text>
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
                    search: `?name=${toSlug(props.tagName, true)}&id=${
                      props.tagID
                    }`,
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <PostTag
                    text={props.tagName}
                    color={props.tagColor ? props.tagColor : "primary.main"}
                  />
                </Link>
              </Stack>
              <Text fontSize="12px">{timeConverter(props.time)}</Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Link>
  );
}
