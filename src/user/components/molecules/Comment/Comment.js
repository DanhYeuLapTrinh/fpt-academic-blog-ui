import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Box, IconButton, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import { timeConverter } from "../../../utils/StringMethod";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import CommentBar from "../../organisms/CommentBar/CommentBar";

export default function Comment({deleteComment, addComment,...props}) {
  const auth = useAuth();
  const {activeComment, setActiveComment} = usePost()
  const isReplying = activeComment && activeComment.id === props.commentId && activeComment.type === "reply"
  const isEditing = activeComment && activeComment.id === props.commentId && activeComment.type === "edit"
  const replyId = props.parentId ? props.parentId : props.commentId
  return (
    <Stack>
      <Stack ml={props.ml} p={2} spacing={1} direction={"row"} alignItems={"flex-start"}>
        <Box width={"5%"}>
          <Link
            to={`/profile/${props.userId}`}
            style={{ textDecoration: "none" }}
          >
            <UserProfile width="42px" height="42px" src={props.src} />
          </Link>
        </Box>
        <Stack spacing={"5px"}>
          <Stack minWidth={"200px"} bgcolor={"secondary.alt"} p={1} borderRadius={"10px"}>
            <Link
              to={`/profile/${props.userId}`}
              style={{ textDecoration: "none" }}
            >
              <Text color="primary.main" fontSize="17px">
                {props.author}
              </Text>
            </Link>
            <Text fontWeight="400" fontSize="15px">
              {props.content}
            </Text>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Text fontSize="12px">{props.time}</Text>
            <IconButton
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={() => setActiveComment({id: props.commentId, type: "reply"})}
              sx={{ p: 0 }}
            >
              <Text fontSize="12px">Phản hồi</Text>
            </IconButton>
            {props.userId === auth.id && (
              <IconButton
                disableFocusRipple
                disableRipple
                disableTouchRipple
                sx={{ p: 0 }}
                onClick={() => deleteComment(props.commentId)}
              >
                <Text fontSize="12px">Xóa</Text>
              </IconButton>
            )}
            {props.userId === auth.id && (
              <IconButton
                disableFocusRipple
                disableRipple
                disableTouchRipple
                sx={{ p: 0 }}
                onClick={() => setActiveComment({id: props.commentId, type: "edit"})}
              >
                <Text fontSize="12px">Chỉnh sửa</Text>
              </IconButton>
            )}
            {props.userId !== auth.id && (
              <IconButton
                disableFocusRipple
                disableRipple
                disableTouchRipple
                sx={{ p: 0 }}
              >
                <Text fontSize="12px">Báo cáo</Text>
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Stack>
      {isReplying && <CommentBar auth={auth} reply handleSubmit={(e) => addComment(e, replyId)}/>} 
      {props.replies.length > 0 &&
        props.replies.map((reply) => (
          <Comment
            key={reply.commentId}
            ml={"55px"}
            content={reply.content}
            author={reply.accountName}
            userId={reply.userId}
            src={reply.avatarURL}
            time={timeConverter(reply.dateOfComment)}
            parentId={reply.parent_id}
            commentId={reply.commentId}
            addComment={addComment}
            replies={[]}
          />
        ))}
    </Stack>
  );
}
