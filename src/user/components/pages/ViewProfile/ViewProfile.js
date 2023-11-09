import { Box, Button, Divider, IconButton, Stack } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Text from "../../atoms/Text/Text";
import ProfileNavList from "../../molecules/ProfileNavList/ProfileNavList";
import UserStoryService from "../../organisms/UserStory/UserStoryService";
import ProfilePost from "../../organisms/ProfilePost/ProfilePost";
import useProfile from "../../../hooks/useProfile";
import { Icon } from "@iconify/react";
import MyMenuOptionListService from "../../organisms/MyMenuOptionList/MyMenuOptionListService";
import useAuth from "../../../hooks/useAuth";

export default function ViewProfile(props) {
  let imgURL = props.url ?? "/assets/img/blank-cover.jpg";
  let avatarURL = props.avatarURL ?? "/assets/img/blank.png";
  const { selected } = useProfile();
  const auth = useAuth();
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
                <>
                  <Text fontSize="23px">Bài viết</Text>
                  {props?.postList?.length > 0 ? (
                    props?.postList?.map((item, index) => (
                      <ProfilePost
                        key={index}
                        url={item.coverURL}
                        isRewarded={item.is_rewarded}
                        postTitle={item.title}
                        description={item.description}
                        majorName={item?.category[0]?.categoryName}
                        majorID={item?.category[0]?.categoryId}
                        subjectName={item?.category[2]?.categoryName}
                        subjectID={item?.category[2]?.categoryId}
                        tagName={item?.tag.tagName}
                        tagID={item?.tag.tagId}
                        time={item.dateOfPost}
                        slug={item.slug}
                        title="22px"
                        small
                      />
                    ))
                  ) : (
                    <Stack
                      justifyContent={"center"}
                      alignItems={"center"}
                      height={"100%"}
                    >
                      <Stack alignItems={"center"} spacing={1}>
                        <Icon
                          icon="mdi:border-none-variant"
                          color="#c3c3c3"
                          width="50"
                          height="50"
                        />
                        <Text color="lightText.main">
                          Chưa có bài viết nào được đăng
                        </Text>
                      </Stack>
                    </Stack>
                  )}
                </>
              )}
              {selected === "Câu hỏi" && (
                <>
                  <Text fontSize="23px">Câu hỏi</Text>
                  {props?.sortedQAList?.length > 0 ? (
                    "Có bài"
                  ) : (
                    <Stack
                      justifyContent={"center"}
                      alignItems={"center"}
                      height={"100%"}
                    >
                      <Stack alignItems={"center"} spacing={1}>
                        <Icon
                          icon="mdi:border-none-variant"
                          color="#c3c3c3"
                          width="50"
                          height="50"
                        />
                        <Text color="lightText.main">
                          Chưa có câu hỏi nào được đăng
                        </Text>
                      </Stack>
                    </Stack>
                  )}
                </>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
