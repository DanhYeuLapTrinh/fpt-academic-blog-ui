import React from "react";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import { Box, Chip, IconButton, Stack } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { Link } from "react-router-dom";
import { timeConverter } from "../../../utils/StringMethod";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import CommentBar from "../../organisms/CommentBar/CommentBar";
import CommentInteractionService from "../../organisms/CommentInteraction/CommentInteractionService";
import CommentMenuOptionListService from "../../organisms/CommentMenuOptionList/CommentMenuOptionListService";
export default function Comment({
  isAllowComment,
  deleteComment,
  addComment,
  editComment,
  setInitialValue,
  comment,
  ...props
}) {
  const auth = useAuth();
  const { activeComment, setActiveComment, postDetail } = usePost();
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
    <Stack pl={props.ml} width={"100%"}>
      <Stack p={"16px 0"} spacing={2} direction={"row"}>
        <Box>
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
                direction={"row"}
                width={"100%"}
                bgcolor={"secondary.alt"}
                minHeight={"80px"}
                borderRadius={"10px"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack p={2} height={"100%"} justifyContent={"space-evenly"}>
                  <Stack
                    direction={"row"}
                    spacing={"10px"}
                    alignItems={"center"}
                  >
                    <Link
                      to={`/profile/${props.userId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Text fontSize="17px">{props.author}</Text>
                    </Link>
                    {comment?.userBadges?.map((item) => (
                      <Text>
                        <Chip
                          label={
                            item.badgeName === "Lecturer"
                              ? "Giảng viên"
                              : item.badgeName
                          }
                          size="small"
                          sx={{
                            minWidth: "50px",
                            borderRadius: "5px",
                            color: "#FF8300",
                            bgcolor: "#FFEDCB",
                          }}
                        />
                      </Text>
                    ))}
                    <Text fontSize="12px" fontWeight="400">
                      {props.time}
                    </Text>
                  </Stack>
                  <Text fontWeight="400" fontSize="15px">
                    {props.content}
                  </Text>
                </Stack>
                {(!postDetail?.allowComment && auth.id === comment.userId) ||
                  (!isEditing && (
                    <CommentMenuOptionListService
                      comment={comment}
                      deleteComment={deleteComment}
                    />
                  ))}
              </Stack>
            )}
          </Stack>
          {isEditing && (
            <CommentBar
              hasCancelButton
              autoFocus
              auth={auth}
              edit
              postDetail={postDetail}
              initialText={props.content}
              handleEdit={(e) => editComment(comment.commentId, e)}
            />
          )}
          {!isEditing && (
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <CommentInteractionService
                upvote={comment?.numOfUpvote}
                downvote={comment?.numOfDownvote}
                comment={comment}
              />
              {postDetail?.allowComment && (
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
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
      {isReplying && (
        <CommentBar
          autoFocus
          auth={auth}
          reply
          postDetail={postDetail}
          handleSubmit={(e) =>
            addComment(e, replyId, props?.commentId, props?.userId)
          }
        />
      )}

      {props.replies.length > 0 &&
        props.replies.map((reply) => (
          <Comment
            key={reply.commentId}
            ml="55px"
            content={reply.content}
            author={reply.accountName}
            userId={reply.userId}
            src={reply.avatarURL}
            time={timeConverter(reply.dateOfComment)}
            parentId={reply.parent_id}
            commentId={reply.commentId}
            addComment={addComment}
            deleteComment={deleteComment}
            editComment={editComment}
            replies={[]}
            comment={reply}
            vote={comment?.numOfUpvote - comment?.numOfDownvote}
          />
        ))}
    </Stack>
  );
}
