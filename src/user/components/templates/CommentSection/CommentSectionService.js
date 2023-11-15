import React from "react";
import CommentSection from "./CommentSection";
import usePost from "../../../hooks/usePost";

export default function CommentSectionService() {
  const { postDetail, activeComment, setActiveComment } = usePost();

  const rootComments = postDetail.comments
    .filter((comment) => comment.parent_id === null)
    .sort(
      (a, b) =>
        new Date(b.dateOfComment).getTime() -
        new Date(a.dateOfComment).getTime()
    );
  const getReplies = (commentId) => {
    return postDetail.comments
      .filter((comment) => comment.parent_id === commentId)
      .sort(
        (a, b) =>
          new Date(a.dateOfComment).getTime() -
          new Date(b.dateOfComment).getTime()
      );
  };
  return (
    <CommentSection
      rootComments={rootComments}
      getReplies={getReplies}
    />
  );
}
