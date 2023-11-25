import React, { useState } from "react";
import styles from "./Styles.module.scss";
import Text from "../../../atoms/Text/Text";
import {
  Box,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { Icon } from "@iconify/react";
import AuthorPost from "../../../molecules/AuthorPost/AuthorPost";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MyBread from "../../../molecules/MyBread/MyBread";
import PostMenuOptionListService from "../../../organisms/PostMenuOptiopList/PostMenuOptionListService";
import PostInteractionService from "../../../organisms/PostInteraction/PostInteractionService";
import CommentSectionService from "../../../templates/CommentSection/CommentSectionService";
import RewardBadge from "../../../atoms/RewardBadge/RewardBadge";
import PostMenu from "../../../organisms/PostMenu/PostMenu";
import UserProfile from "../../../atoms/UserProfile/UserProfile";
import { Link } from "react-router-dom";
export default function ViewAPost({ postDetail, handleActions, ...props }) {
  const [open, setOpen] = useState(false);
  const parser = new DOMParser();
  const doc = parser.parseFromString(postDetail?.content, "text/html");
  const handleClickRewarded = () => {
    setOpen(true);
  };

  const handleCloseRewarded = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  return (
    <Container
      sx={{
        mb: !props.previewHistory ? 5 : 0,
        minHeight: !props.previewHistory && "calc(100vh - 93px)",
      }}
    >
      {!props.previewHistory && (
        <MyBread
          input={postDetail?.category}
          tag={postDetail?.tag}
          separator={<KeyboardDoubleArrowRightIcon sx={{ width: "16px" }} />}
        />
      )}
      <Text m={!props.previewHistory ? "5px 0 20px" : "5px 0 10px"}>
        <p style={{ fontSize: "40px", lineHeight: "50px", fontWeight: "500" }}>
          {postDetail?.title}
        </p>
      </Text>
      {props.previewHistory && (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          width={"100%"}
          p={"5px 0"}
        >
          <AuthorPost
            src={postDetail?.avatarURL}
            text={postDetail?.accountName}
            time={postDetail?.dateOfPost}
            userId={postDetail?.userId}
            comments={postDetail?.comments?.length}
            isFollowing={props.isFollowing}
            handleActions={handleActions}
            avatarWidth="45px"
            avatarHeight="45px"
            authorSize="16px"
            previewHistory
          />
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            {postDetail?.postSkill?.map((item) => (
              <Text>
                <Link to={`/keywords/${item.skillName}`}>
                  <Chip
                    label={item.skillName}
                    sx={{
                      minWidth: "50px",
                      borderRadius: "5px",
                      color: "secondary.main",
                      bgcolor: "primary.main",
                      fontSize: "16px",
                    }}
                  />
                </Link>
              </Text>
            ))}
          </Stack>
        </Stack>
      )}
      {!props.previewHistory && (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"20px"}
        >
          <AuthorPost
            src={postDetail?.avatarURL}
            text={postDetail?.accountName}
            time={postDetail?.dateOfPost}
            userId={postDetail?.userId}
            comments={postDetail?.comments?.length}
            isFollowing={props.isFollowing}
            handleActions={handleActions}
            avatarWidth="45px"
            avatarHeight="45px"
            authorSize="16px"
          />
          <Stack direction={"row"} alignItems={"center"}>
            {postDetail?.tag?.tagName !== "Q&A" &&
              (!props.isFavored ? (
                <Tooltip title="Thêm danh sách yêu thích" placement="top">
                  <IconButton onClick={() => handleActions("save")}>
                    <Icon
                      icon="ion:bookmark-outline"
                      width={"24px"}
                      color="#444746"
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Xóa khỏi danh sách yêu thích" placement="top">
                  <IconButton onClick={() => handleActions("unsave")}>
                    <Icon icon="ion:bookmark" width={"24px"} color="#5927e5" />
                  </IconButton>
                </Tooltip>
              ))}
            <PostMenuOptionListService
              userId={postDetail?.userId}
              postId={postDetail?.postId}
              allowComment={postDetail?.allowComment}
              isEdited={postDetail?.is_edited}
              postDetail={postDetail}
            />
          </Stack>
        </Stack>
      )}
      {doc && !props.previewHistory && <PostMenu menu={doc} />}
      <div className={styles.contentWrapper}>
        {postDetail?.coverURL && (
          <Box sx={{ position: "relative" }}>
            <img
              style={{
                marginBottom: postDetail?.coverURL ? "30px" : "0px",
                position: "relative",
              }}
              src={postDetail?.coverURL}
            />
            {postDetail?.is_rewarded && postDetail?.rewarder?.length >= 2 && (
              <>
                <Tooltip
                  title={`Được trao thưởng bởi ${postDetail?.rewarder?.length} giảng viên`}
                  placement="top"
                >
                  <IconButton
                    sx={{ position: "absolute", top: "15px", right: "5px" }}
                    disableFocusRipple
                    disableTouchRipple
                    disableRipple
                    onClick={handleClickRewarded}
                  >
                    <RewardBadge small width="40px" height="40px" zIndex="1" />
                  </IconButton>
                </Tooltip>
                <Dialog
                  disableEscapeKeyDown
                  open={open}
                  onClose={handleCloseRewarded}
                  maxWidth="md"
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    sx={{ p: "14px", minWidth: "500px" }}
                  >
                    <Box />
                    <Text fontSize="20px">Người trao thưởng</Text>
                    <IconButton
                      sx={{
                        p: "8px",
                      }}
                      disableFocusRipple
                      disableRipple
                      disableTouchRipple
                      onClick={handleCloseRewarded}
                    >
                      <Icon icon="octicon:x-12" color="#444746 " width="20" />
                    </IconButton>
                  </Stack>
                  <Divider orientation="horizontal" />
                  <DialogContent sx={{ p: 0 }}>
                    <Stack sx={{ p: 3 }} spacing={4} width={"100%"}>
                      {postDetail?.rewarder?.map((item) => (
                        <Stack
                          direction={"row"}
                          spacing={2}
                          alignItems={"center"}
                          width={"100%"}
                          flexWrap={"wrap"}
                        >
                          <Link
                            to={`/profile/${item.userId}`}
                            style={{ textDecoration: "none" }}
                          >
                            <UserProfile
                              src={item.avatarURL}
                              width="40px"
                              height="40px"
                            />
                          </Link>
                          <Stack>
                            <Link
                              to={`/profile/${item.userId}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Text>{item.fullName}</Text>
                            </Link>
                            <Stack
                              direction={"row"}
                              spacing={1}
                              flexWrap={"wrap"}
                              width={"100%"}
                            >
                              {item.badges.map((badge) => (
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
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </Box>
        )}
        <div dangerouslySetInnerHTML={{ __html: postDetail?.content }} />
      </div>
      {!props.previewHistory && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={1}
          m={"30px 0 20px"}
          flexWrap={"wrap"}
        >
          {postDetail?.postSkill?.map((item) => (
            <Text>
              <Link
                to={`/keywords/${
                  item.skillName !== "C#" ? item.skillName : "c-sharp"
                }`}
              >
                <Chip
                  label={item.skillName}
                  sx={{
                    minWidth: "50px",
                    borderRadius: "5px",
                    color: "secondary.main",
                    bgcolor: "primary.main",
                    fontSize: "16px",
                  }}
                />
              </Link>
            </Text>
          ))}
        </Stack>
      )}
      {!props.previewHistory && (
        <>
          <PostInteractionService
            vote={props.vote}
            select={props.select}
            setSelect={props.setSelect}
            handleActions={handleActions}
          />
          <CommentSectionService comments={postDetail?.comments} />
        </>
      )}
    </Container>
  );
}
