import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Box, IconButton, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import { timeConverter } from "../../../utils/StringMethod";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import CommentBar from "../../organisms/CommentBar/CommentBar";
import CommentInteractionService from "../../organisms/CommentInteraction/CommentInteractionService";
import CommentMenuOptionListService from "../../organisms/CommentMenuOptionList/CommentMenuOptionListService";
export default function Comment({
  deleteComment,
  addComment,
  editComment,
  setInitialValue,
  ...props
}) {
  const auth = useAuth();
  const { activeComment, setActiveComment } = usePost();
  const isReplying =
    activeComment &&
    activeComment.id === props.commentId &&
    activeComment.type === "reply";
  const isEditing =
    activeComment &&
    activeComment.id === props.commentId &&
    activeComment.type === "edit";
  const replyId = props.parentId ? props.parentId : props.commentId;
  return (
    <Stack>
      <Stack ml={props.ml} p={2} spacing={1} direction={"row"}>
        <Box width={"5%"}>
          <Link
            to={`/profile/${props.userId}`}
            style={{ textDecoration: "none" }}
          >
            <UserProfile width="42px" height="42px" src={props.src} />
          </Link>
        </Box>
        <Stack spacing={"5px"} width={"100%"}>
          <Stack direction={"row"} spacing={1} width={"100%"}>
            {!isEditing && (
              <Stack
                minWidth={"300px"}
                bgcolor={"secondary.alt"}
                p={1}
                borderRadius={"10px"}
              >
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
            )}
            {isEditing && (
              <CommentBar
                hasCancelButton
                autoFocus
                auth={auth}
                edit
                initialText={props.content}
                handleEdit={(e) => editComment(props.comment.commentId, e)}
              />
            )}
            {!isEditing && (
              <CommentMenuOptionListService
                comment={props.comment}
                deleteComment={deleteComment}
              />
            )}
          </Stack>
          {!isEditing && (
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Text fontSize="12px">{props.time}</Text>
              <CommentInteractionService
                vote={props.comment?.numOfUpvote - props.comment?.numOfDownvote}
                comment={props.comment}
              />
              <IconButton
                disableFocusRipple
                disableRipple
                disableTouchRipple
                onClick={() =>
                  setActiveComment({ id: props.commentId, type: "reply" })
                }
                sx={{ p: 0 }}
              >
                <Text fontSize="12px">Phản hồi</Text>
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Stack>
      {isReplying && (
        <CommentBar
          autoFocus
          auth={auth}
          reply
          handleSubmit={(e) => addComment(e, replyId)}
        />
      )}

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
            deleteComment={deleteComment}
            replies={[]}
            comment={reply}
            vote={props.comment?.numOfUpvote - props.comment?.numOfDownvote}
          />
        ))}
    </Stack>
  );
}
