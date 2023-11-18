import React from "react";
import Comment from "../../molecules/Comment/Comment";
import { Stack } from "@mui/material";
import { timeConverter } from "../../../utils/StringMethod";

export default function CommentsList({
  rootComments,
  getReplies,
  deleteComment,
  addComment,
  editComment,
  ...props
}) {
  return (
    <Stack>
      {rootComments?.map((comment) => (
        <Comment
          key={comment.commentId}
          content={comment.content}
          author={comment.accountName}
          commentId={comment.commentId}
          userId={comment.userId}
          src={comment.avatarURL}
          time={timeConverter(comment.dateOfComment)}
          replies={getReplies(comment.commentId)}
          deleteComment={deleteComment}
          parentId={comment.parent_id}
          addComment={addComment}
          editComment={editComment}
          comment={comment}
        />
      ))}
    </Stack>
  );
}
