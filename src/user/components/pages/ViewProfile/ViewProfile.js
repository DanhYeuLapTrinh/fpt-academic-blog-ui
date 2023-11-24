import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Text from "../../atoms/Text/Text";
import ProfileNavList from "../../molecules/ProfileNavList/ProfileNavList";
import UserStoryService from "../../organisms/UserStory/UserStoryService";
import useProfile from "../../../hooks/useProfile";
import { Icon } from "@iconify/react";
import MyMenuOptionListService from "../../organisms/MyMenuOptionList/MyMenuOptionListService";
import useAuth from "../../../hooks/useAuth";
import ProfilePostList from "../../organisms/ProfileDetail/ProfilePostList/ProfilePostList";
import ProfileQuestionList from "../../organisms/ProfileDetail/ProfileQuestionList/ProfileQuestionList";
import UploadImageIcon from "../../organisms/UploadImageIcon/UploadImageIcon";
import UploadCoverIcon from "../../organisms/UploadImageIcon/UploadCoverIcon";
import ProfileFollowerListService from "../../organisms/ProfileDetail/ProfileFollowerList/ProfileFollowerListService";
import ProfileFollowingListService from "../../organisms/ProfileDetail/ProfileFollowingList/ProfileFollowingListService";

export default function ViewProfile({ removePost, ...props }) {
  const { avatarURL, profileCoverURL, selected } = useProfile();
  const auth = useAuth();
  let avatarUser =
    (props?.userId === auth.id && avatarURL) ||
    props?.profileUrl ||
    "/assets/img/blank.png";
  let coverUser =
    (props?.userId === auth.id && profileCoverURL) ||
    props?.coverUrl ||
    "/assets/img/blank-cover.jpg";
  return (
    <Box>
      <Box sx={{ bgcolor: "secondary.alt" }}>
        <Container>
          <Box height={`calc(${props?.height} + 90px)`}>
            <Box
              sx={{
                width: "100%",
                height: props?.height,
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
              {props?.userId === auth.id && (
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
                  width: "200px",
                  height: "200px",
                  backgroundImage: `url(${avatarUser})`,
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
                  bottom: "-80px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              >
                {props?.userId === auth.id && (
                  <Tooltip title="Đổi ảnh đại diện" placement="right">
                    <IconButton
                      disableFocusRipple
                      disableTouchRipple
                      disableRipple
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
              {props?.accountName}
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
                  <span style={{ fontWeight: "600" }}>
                    {props?.user?.numOfPost}
                  </span>
                </Text>
                <Text fontSize="24px" lineHeight="20px" color="text.main">
                  &middot;
                </Text>
                <Text fontSize="12px" fontWeight="400">
                  Người theo dõi:{" "}
                  <span style={{ fontWeight: "600" }}>
                    {props?.numOfFollower}
                  </span>
                </Text>
              </Stack>
              {auth.id !== props?.userId && (
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Button
                    onClick={
                      !props?.isFollowing
                        ? props?.followAccount
                        : props?.unfollowAccount
                    }
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    size="small"
                    sx={{
                      textTransform: "none",
                      borderRadius: "5px",
                      flex: 1,
                      bgcolor: props?.isFollowing
                        ? "primary.main"
                        : "lightText.main",
                      opacity: props?.isFollowing ? "1" : "0.7",
                      "&:hover": {
                        backgroundColor: props?.isFollowing
                          ? "primary.main"
                          : "lightText.main",
                      },
                    }}
                    startIcon={
                      props?.isFollowing ? (
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
                      fontWeight={props?.isFollowing ? "500" : "400"}
                      color={props?.isFollowing && "secondary.main"}
                    >
                      {props?.isFollowing ? "Đang theo dõi" : "Theo dõi"}
                    </Text>
                  </Button>
                  <MyMenuOptionListService />
                </Stack>
              )}
            </Stack>
            <Divider sx={{ width: "100%", mt: "30px " }} />
          </Stack>
          <ProfileNavList slug={props?.slug} />
        </Container>
      </Box>
      <Box sx={{ m: "20px 0", minHeight: "100vh" }}>
        <Container>
          <Stack direction={"row"} gap={"20px"}>
            <Stack spacing={"20px"} width={"320px"}>
              <Box width={"100%"}>
                <UserStoryService
                  userId={props?.userId}
                  userStory={props?.userStory}
                />
              </Box>
              {props?.user?.badges?.length > 0 && (
                <Box
                  sx={{
                    width: "320px",
                    minHeight: "120px",
                    bgcolor: "secondary.alt",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <Text fontSize="23px" mb={2}>
                    Danh hiệu
                  </Text>
                  <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                    {props?.badges?.map((badge) => (
                      <Text>
                        <Chip
                          label={
                            badge.badgeName === "Lecturer"
                              ? "Giảng viên"
                              : badge.badgeName
                          }
                          size="small"
                          sx={{
                            minWidth: "50px",
                            borderRadius: "5px",
                            color: "primary.main",
                          }}
                        />
                      </Text>
                    ))}
                  </Stack>
                </Box>
              )}
              {props?.user?.skills?.length > 0 && (
                <Box
                  sx={{
                    width: "320px",
                    minHeight: "120px",
                    bgcolor: "secondary.alt",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <Text fontSize="23px" mb={1}>
                    Kỹ năng
                  </Text>
                  <Stack
                    direction={"row"}
                    flexWrap={"wrap"}
                    gap={1}
                    paddingTop={"10px"}
                  >
                    {props?.user?.skills?.map((badge) => (
                      <Text>
                        <Chip
                          label={badge}
                          size="small"
                          sx={{
                            minWidth: "50px",
                            borderRadius: "5px",
                            color: "primary.main",
                          }}
                        />
                      </Text>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
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
                <ProfilePostList
                  postList={props?.approvedPostsList}
                  pendingPostList={props?.sortedPendingPostsList}
                  userId={props?.userId}
                  removePost={removePost}
                />
              )}
              {selected === "Câu hỏi" && (
                <ProfileQuestionList
                  qaList={props?.approvedQAList}
                  pendingQAList={props?.sortedPendingQAList}
                  userId={props?.userId}
                />
              )}
              {selected === "Người theo dõi" && <ProfileFollowerListService />}
              {selected === "Đang theo dõi" && <ProfileFollowingListService />}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
