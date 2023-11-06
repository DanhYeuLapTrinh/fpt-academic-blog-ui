import { Box, Divider, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Text from "../../atoms/Text/Text";
import ProfileNavList from "../../molecules/ProfileNavList/ProfileNavList";
import UserStoryService from "../../organisms/UserStory/UserStoryService";
import ProfilePost from "../../organisms/ProfilePost/ProfilePost";

export default function ViewProfile(props) {
  let imgURL = props.url ?? "/assets/img/blank-cover.jpg";
  let avatarURL = props.avatarURL ?? "/assets/img/blank.png";
  return (
    <Box>
      <Box sx={{ bgcolor: "secondary.alt" }}>
        <Container>
          <Box height={`calc(${props.height} + 80px)`}>
            <Box
              sx={{
                width: "100%",
                height: props.height,
                backgroundImage: `url(${imgURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "0 0 10px 10px",
                padding: "25px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  width: "165px",
                  height: "165px",
                  backgroundImage: `url(${avatarURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "50%",
                  border: "3px solid white",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  position: "absolute",
                  bottom: "-70px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
          <Stack alignItems={"center"}>
            <Text fontSize="24px" fontWeight="600">
              {props.accountName}
            </Text>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={1}
              sx={{ mt: "4px" }}
            >
              <Text fontSize="12px" fontWeight="400">
                Bài đã đăng:{" "}
                <span style={{ fontWeight: "600" }}>{props.numOfPost}</span>
              </Text>
              <Text fontSize="24px" lineHeight="20px" color="text.main">
                &middot;
              </Text>
              <Text fontSize="12px" fontWeight="400">
                Người theo dõi:{" "}
                <span style={{ fontWeight: "600" }}>{props.numOfFollower}</span>
              </Text>
            </Stack>
            <Divider sx={{ width: "100%", mt: "30px " }} />
          </Stack>
          <ProfileNavList slug={props.slug} />
        </Container>
      </Box>
      <Box sx={{ m: "20px 0" }}>
        <Container>
          <Stack direction={"row"} gap={"20px"}>
            <Box width={"320px"}>
              <UserStoryService userStory={props.userStory} />
            </Box>
            <Box
              width={"calc(100% - 320px)"}
              sx={{
                bgcolor: "secondary.alt",
                borderRadius: "10px",
                minHeight: "calc(100vh - 573px)",
                padding: "20px",
              }}
            >
              {props.postList && (
                <ProfilePost
                  url={props.postList[3].coverURL}
                  isRewarded={props.postList[3].is_rewarded}
                  postTitle={props.postList[3].title}
                  description={props.postList[3].description}
                  major={props.postList[3].category[0]} 
                  subject={props.postList[3].category[1]} 
                  tag={props.postList[3].tag}
                  time={props.postList[3].dateOfPost}
                  title="22px"
                  small
                />
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
