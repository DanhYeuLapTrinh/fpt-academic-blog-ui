import React from "react";
import styles from "./Styles.module.scss";
import Text from "../../../atoms/Text/Text";
import { Box, Container, IconButton, Stack, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import AuthorPost from "../../../molecules/AuthorPost/AuthorPost";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MyBread from "../../../molecules/MyBread/MyBread";
import PostMenuOptionListService from "../../../organisms/PostMenuOptiopList/PostMenuOptionListService";
import PostInteractionService from "../../../organisms/PostInteraction/PostInteractionService";
import CommentSectionService from "../../../templates/CommentSection/CommentSectionService";
import RewardBadge from "../../../atoms/RewardBadge/RewardBadge";
import { Link } from "react-router-dom";
import PopupEdit from "../../../organisms/PopupEdit/PopupEdit";
export default function ViewAPost(props) {
  return (
    <Container sx={{ mb: 10, minHeight: "calc(100vh - 93px - 80px)" }}>
      <MyBread
        input={props?.data?.category}
        tag={props?.data?.tag}
        separator={<KeyboardDoubleArrowRightIcon sx={{ width: "16px" }} />}
      />
      {props.data.editedSlug && (
        <PopupEdit
          oldLink={props.data?.editedSlug}
          oldName={props.data?.editedSlug}
          label="Bài viết này đã được sửa thành: "
        />
      )}
      <Text m="5px 0 20px">
        <p style={{ fontSize: "40px", lineHeight: "50px", fontWeight: "500" }}>
          {props.data?.title}
        </p>
      </Text>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <AuthorPost
          src={props.data?.avatarURL}
          text={props.data?.accountName}
          time={props.data?.dateOfPost}
          userId={props.data?.userId}
          comments={props?.data?.comments.length}
          isFollowing={props.isFollowing}
          unfollowAccount={props.unfollowAccount}
          followAccount={props.followAccount}
          avatarWidth="40px"
          avatarHeight="40px"
          authorSize="16px"
        />
        <Stack direction={"row"} alignItems={"center"}>
          {!props.isFavored ? (
            <Tooltip title="Thêm danh sách yêu thích" placement="top">
              <IconButton onClick={props.addToFavorite}>
                <Icon
                  icon="ion:bookmark-outline"
                  width={"24px"}
                  color="#444746"
                />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Xóa khỏi danh sách yêu thích" placement="top">
              <IconButton onClick={props.removeFromFavorite}>
                <Icon icon="ion:bookmark" width={"24px"} color="#5927e5" />
              </IconButton>
            </Tooltip>
          )}
          <PostMenuOptionListService
            userId={props.data?.userId}
            postId={props.data?.postId}
            allowComment={props.data?.allowComment}
            isEdited={props.data?.is_edited}
            data={props.data}
          />
        </Stack>
      </Stack>
      <div className={styles.contentWrapper}>
        {props.data?.coverURL && (
          <Box sx={{ position: "relative" }}>
            <img
              style={{
                marginBottom: props.data?.coverURL ? "30px" : "0px",
                position: "relative",
              }}
              src={props.data?.coverURL}
            />
            {props.data?.is_rewarded && (
              <Link to={"/rewarded"}>
                <RewardBadge
                  small
                  position="absolute"
                  top="15px"
                  width="60px"
                  height="50px"
                  right="15px"
                  zIndex="999"
                />
              </Link>
            )}
          </Box>
        )}
        <div dangerouslySetInnerHTML={{ __html: props.data?.content }} />
      </div>
      <PostInteractionService
        vote={props.vote}
        select={props.select}
        setSelect={props.setSelect}
        handleUpvote={props.handleUpvote}
        handleDownvote={props.handleDownvote}
      />
      <CommentSectionService comments={props.data.comments} />
    </Container>
  );
}
