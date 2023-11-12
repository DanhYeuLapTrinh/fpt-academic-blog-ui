import React from "react";
import CommentBar from "../../organisms/CommentBar/CommentBar";
import CommentsList from "../../organisms/CommentsList/CommentsList";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePost from "../../../hooks/usePost";

export default function CommentSection({ rootComments, getReplies }) {
  const axiosPrivate = useAxiosPrivate();
  const { postDetail, setPostDetail, setActiveComment } = usePost();
  const addComment = async (e, parentId = null) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      let value = e.target.value.trim();
      if (value === "") return;
      try {
        e.preventDefault();
        if (parentId) {
          let response = await axiosPrivate.post(
            process.env.REACT_APP_REPLY_COMMENT,
            {
              postId: postDetail?.postId,
              parentCommentId: parentId,
              content: value,
            }
          );
          if (response) {
            let { comments } = postDetail;
            comments.push(response.data);
            setPostDetail({ ...postDetail, comments: comments });
            e.target.value = "";
            setActiveComment(null);
          }
        } else {
          let response = await axiosPrivate.post(
            process.env.REACT_APP_CREATE_COMMENT,
            {
              postId: postDetail?.postId,
              content: value,
            }
          );
          if (response) {
            let { comments } = postDetail;
            comments.push(response.data);
            setPostDetail({ ...postDetail, comments: comments });
            e.target.value = "";
          }
        }
      } catch (error) {}
    }
  };
  const deleteComment = async (commentId) => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_DELETE_COMMENT,
        {
          commentId: commentId,
        }
      );
      if (response) {
        let { comments } = postDetail;
        let newComments = comments.filter(
          (comment) => comment.commentId !== commentId
        );
        setPostDetail({ ...postDetail, comments: newComments });
      }
    } catch (error) {}
  };

  return (
    <>
      <CommentBar handleSubmit={addComment} />
      <CommentsList
        rootComments={rootComments}
        getReplies={getReplies}
        deleteComment={deleteComment}
        addComment={addComment}
      />
    </>
  );
}
