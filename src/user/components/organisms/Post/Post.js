import { Box, Stack } from "@mui/material";
import React from "react";
import RewardBadge from "../../atoms/RewardBadge/RewardBadge";
import Wrapper from "../../atoms/Wrapper/Wrapper";
import Text from "../../atoms/Text/Text";
import Author from "../../molecules/Author/Author";
import PostTag from "../../atoms/PostTag/PostTag";
import { Link } from "react-router-dom";

export default function Post(props) {
  return (
    <Link to={`/view/${props.slug}`} style={{textDecoration: "none"}}>
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
          ></Box>
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
                />
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
            </Stack>
          </Box>
        </Stack>
      </div>
    </Link>
  );
}
