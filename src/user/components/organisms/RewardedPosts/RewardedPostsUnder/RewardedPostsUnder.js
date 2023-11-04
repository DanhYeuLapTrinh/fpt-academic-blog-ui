import { Box, Stack } from "@mui/material";
import React from "react";
import RewardBadge from "../../../atoms/RewardBadge/RewardBadge";
import Text from "../../../atoms/Text/Text";
import Author from "../../../molecules/Author/Author";
import PostTag from "../../../atoms/PostTag/PostTag";
import Wrapper from "../../../atoms/Wrapper/Wrapper";
import { Link } from "react-router-dom";

export default function RewardedPostsUnder(props) {
  return (
    <Link to={`/view/${props?.slug}`} style={{ textDecoration: "none" }}>
      <div style={{ width: "100%", padding: "20px 0" }}>
        <Stack direction={"row"}>
          <Box
            sx={{
              backgroundImage: `url(${props.url})`,
              width: "265px",
              height: "240px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              position: "relative",
            }}
          >
            {props.isRewarded && (
              <RewardBadge
                small={true}
                position="absolute"
                top="15px"
                right="15px"
                zIndex="999"
              />
            )}
          </Box>
          <Box sx={{ width: "calc(100% - 265px)", p: "0px 20px" }}>
            <Stack height={"240px"} justifyContent={"space-evenly"}>
              <Wrapper WebkitLineClamp="2">
                <Text fontSize="24px" lineHeight="30px">
                  {props.title}
                </Text>
              </Wrapper>
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  paddingTop: "5px",
                }}
              >
                <Text fontWeight="400" fontSize="14px">
                  {props.description}
                </Text>
              </Box>
              <Author
                time={props.time}
                src={props.avatar}
                author={true}
                text={props.label}
              />
              <Stack direction={"row"} spacing={"12px"} paddingTop={"5px"}>
                <PostTag color="primary.main" text={props.major} />
                <PostTag color="primary.main" text={props.subject} />
                <PostTag color="primary.main" text={props.tag} />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </div>
    </Link>
  );
}
