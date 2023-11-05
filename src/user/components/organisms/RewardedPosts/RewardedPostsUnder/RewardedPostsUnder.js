import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import RewardBadge from "../../../atoms/RewardBadge/RewardBadge";
import Text from "../../../atoms/Text/Text";
import Author from "../../../molecules/Author/Author";
import PostTag from "../../../atoms/PostTag/PostTag";
import Wrapper from "../../../atoms/Wrapper/Wrapper";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import LecturerMenuService from "../../LecturerMenu/LecturerMenuService";
import { getFirstChar, toSlug } from "../../../../utils/StringMethod";
import useManagePost from "../../../../hooks/useManagePost";
export default function RewardedPostsUnder(props) {
  return (
    <div style={{ width: "100%", padding: "20px 0" }}>
      <Stack direction={"row"}>
        <Link to={`${props?.slug}`} style={{ textDecoration: "none" }}>
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
        </Link>
        <Box sx={{ width: "calc(100% - 265px)", p: "0px 20px" }}>
          <Stack height={"240px"} justifyContent={"space-evenly"}>
            <Link to={`${props?.slug}`} style={{ textDecoration: "none" }}>
              <Wrapper WebkitLineClamp="2">
                <Text fontSize="24px" lineHeight="30px">
                  {props.title}
                </Text>
              </Wrapper>
            </Link>
            {props.approve && (
              <LecturerMenuService
                isRewarded={props.isRewarded}
                postId={props.postId}
              />
            )}
            <Link to={`${props?.slug}`} style={{ textDecoration: "none" }}>
              <Wrapper WebkitLineClamp="3">
                <Text fontWeight="400" fontSize="14px">
                  {props.description}
                </Text>
              </Wrapper>
            </Link>
            <Author
              time={props.time}
              src={props.avatar}
              author={true}
              text={props.label}
              profile={props.userId}
            />
            <Stack direction={"row"} spacing={"12px"} paddingTop={"5px"}>
              <PostTag
                color="primary.main"
                text={getFirstChar(props.major)}
                link={toSlug(props.major, true)}
              />
              <PostTag
                color="primary.main"
                text={props.subject}
                link={toSlug(props.subject, true)}
              />
              <PostTag
                color="primary.main"
                text={props.tag}
                link={toSlug(props.tag, true)}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
