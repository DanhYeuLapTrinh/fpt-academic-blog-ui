import { Box, Stack } from "@mui/material";
import React from "react";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import Text from "../../atoms/Text/Text";
import Author from "../../molecules/Author/Author";
import PostTag from "../../atoms/PostTag/PostTag";
import { Link } from "react-router-dom";
import { getFirstChar, toSlug } from "../../../utils/StringMethod";
import RewardBadge from "../../atoms/RewardBadge/RewardBadge";

export default function Post(props) {
  return (
    <Link to={`/view/${props.slug}`} style={{ textDecoration: "none" }}>
      <div style={{ width: "100%", paddingTop: "20px" }}>
        <Stack direction={"row"}>
          <Box
            sx={{
              backgroundImage: `url(${props.url})`,
              width: "240px",
              height: "149px",
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
                  zIndex="999"
                />
              </Link>
            )}
          </Box>
          <Box sx={{ width: "calc(100% - 240px)", p: "0px 0px 0px 20px" }}>
            <Stack height={"149px"} justifyContent={"space-evenly"}>
              <Wrapper WebkitLineClamp="2">
                <Text fontSize="20px" lineHeight="24px">
                  {props.title}
                </Text>
              </Wrapper>
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  paddingTop: "5px",
                }}
              >
                <Text fontWeight="400" fontSize="13px">
                  {props.description}
                </Text>
              </Box>
              <Stack
                width={"100%"}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Author
                  src={props.src}
                  author={true}
                  text={props.author}
                  time={props.time}
                  profile={props.userId}
                />
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
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </div>
    </Link>
  );
}
