import React from "react";
import styles from "./Styles.module.scss";
import Text from "../../../atoms/Text/Text";
import { Container, IconButton, Skeleton, Stack, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react";
import AuthorPost from "../../../molecules/AuthorPost/AuthorPost";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MyBread from "../../../molecules/MyBread/MyBread";
import PostMenuOptionListService from "../../../organisms/PostMenuOptiopList/PostMenuOptionListService";
import PostInteractionService from "../../../organisms/PostInteraction/PostInteractionService";
import CommentBar from "../../../organisms/CommentBar/CommentBar";
export default function ViewAPost(props) {
  return (
    <Container sx={{mb: 10}}>
      <MyBread
        input={props?.data?.category}
        tag={props?.data?.tag}
        separator={<KeyboardDoubleArrowRightIcon sx={{ width: "16px" }} />}
      />
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
            allowComment={props.data?.allowComment}
            isEdited={props.data?.is_edited}
          />
        </Stack>
      </Stack>
      <div className={styles.contentWrapper}>
        <img style={{ marginBottom: "30px" }} src={props.data?.coverURL} />
        <div dangerouslySetInnerHTML={{ __html: props.data?.content }} />
      </div>
      <PostInteractionService
        postId={props.data.postId}
        vote={props.data.numOfUpVote - props.data.numOfDownVote}
      />
      <CommentBar src={props.data.avatarURL} profile={props.data?.userId}/>
    </Container>
  );
}
