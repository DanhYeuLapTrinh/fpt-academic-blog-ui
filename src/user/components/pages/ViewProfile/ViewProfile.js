import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Text from "../../atoms/Text/Text";
import ProfileNavList from "../../molecules/ProfileNavList/ProfileNavList";
import UserStoryService from "../../organisms/UserStory/UserStoryService";
import useProfile from "../../../hooks/useProfile";
import { Icon } from "@iconify/react";
import MyMenuOptionListService from "../../organisms/MyMenuOptionList/MyMenuOptionListService";
import useAuth from "../../../hooks/useAuth";
import ProfilePostList from "../../organisms/ProfileDetail/ProfilePostList/ProfilePostList";
import ProfileQuestionList from "../../organisms/ProfileDetail/ProfileQuestionList/ProfileQuestionList";
import ProfileFollowerList from "../../organisms/ProfileDetail/ProfileFollowerList/ProfileFollowerList";
import UploadImageIcon from "../../organisms/UploadImageIcon/UploadImageIcon";
import useHome from "../../../hooks/useHome";
import UploadCoverIcon from "../../organisms/UploadImageIcon/UploadCoverIcon";

export default function ViewProfile(props) {
  const { avatarURL, profileCoverURL, selected } = useProfile();
  const { isLoading } = useHome();
  const auth = useAuth();
  let avatarUser =
    (props.userId === auth.id && avatarURL) ||
    props.profileUrl ||
    "/assets/img/blank.png";
  let coverUser =
    (props.userId === auth.id && profileCoverURL) ||
    props.coverUrl ||
    "/assets/img/blank-cover.jpg";
  
  return (
    <Box>
      <Box sx={{ bgcolor: "secondary.alt" }}>
        <Container>
          <Box height={`calc(${props.height} + 80px)`}>
            <Box
              sx={{
                width: "100%",
                height: props.height,
                backgroundImage: `url(${coverUser})`,
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
              {props.userId === auth.id && (
                <IconButton
                  disableFocusRipple
                  disableTouchRipple
                  disableRipple
                  sx={{ position: "absolute", right: 2, bottom: 2 }}
                >
                  <UploadCoverIcon />
                </IconButton>
              )}
              <Box
                sx={{
                  width: "165px",
                  height: "165px",
                  backgroundImage: `url(${avatarUser})`,
                  opacity: isLoading ? "0.9" : "1",
                  bgcolor: "white",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "50%",
                  border: "3px solid white",
                  padding: "25px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: "-70px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              >
                {props.userId === auth.id && (
                  <Tooltip title="Đổi ảnh đại diện" placement="right">
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: "-10px",
                        right: "5px",
                      }}
                    >
                      <UploadImageIcon bottom="-5px" right="16px" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
          <Stack alignItems={"center"}>
            <Text fontSize="24px" fontWeight="600">
              {props.accountName}
            </Text>
            <Stack spacing={"4px"}>
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
                  <span style={{ fontWeight: "600" }}>
                    {props.numOfFollower}
                  </span>
                </Text>
              </Stack>
              {auth.id !== props.userId && (
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Button
                    onClick={
                      !props.isFollowing
                        ? props.followAccount
                        : props.unfollowAccount
                    }
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    size="small"
                    sx={{
                      textTransform: "none",
                      borderRadius: "5px",
                      flex: 1,
                      bgcolor: props.isFollowing
                        ? "primary.main"
                        : "lightText.main",
                      opacity: props.isFollowing ? "1" : "0.7",
                      "&:hover": {
                        backgroundColor: props.isFollowing
                          ? "primary.main"
                          : "lightText.main",
                      },
                    }}
                    startIcon={
                      props.isFollowing ? (
                        <Icon
                          icon="fa-solid:user-check"
                          color="white"
                          width="18"
                        />
                      ) : (
                        <Icon
                          icon="fa-solid:user-plus"
                          color="#444746"
                          width="18"
                        />
                      )
                    }
                  >
                    <Text
                      fontSize="12px"
                      fontWeight={props.isFollowing ? "500" : "400"}
                      color={props.isFollowing && "secondary.main"}
                    >
                      {props.isFollowing ? "Đang theo dõi" : "Theo dõi"}
                    </Text>
                  </Button>
                  <MyMenuOptionListService userId={props.userId} />
                </Stack>
              )}
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
              <UserStoryService
                userId={props.userId}
                userStory={props.userStory}
              />
            </Box>
            <Stack
              width={"calc(100% - 320px)"}
              sx={{
                bgcolor: "secondary.alt",
                borderRadius: "10px",
                minHeight: "calc(100vh - 573px)",
                padding: "20px",
              }}
              spacing={"20px"}
            >
              {selected === "Bài viết" && (
                <ProfilePostList postList={props.postList} />
              )}
              {selected === "Câu hỏi" && (
                <ProfileQuestionList qaList={props.qaList} />
              )}
              {selected === "Người theo dõi" && (
                <ProfileFollowerList followerList={props.followerList} />
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
