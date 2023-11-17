import React, { useState } from "react";
import CommentBar from "../../organisms/CommentBar/CommentBar";
import CommentsList from "../../organisms/CommentsList/CommentsList";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePost from "../../../hooks/usePost";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import Text from "../../atoms/Text/Text";

export default function CommentSection({ rootComments, getReplies }) {
  const axiosPrivate = useAxiosPrivate();
  const { postDetail, setPostDetail, setActiveComment, isAllowComment } =
    usePost();

  const addComment = async (e, parentId = null) => {
    let value = e.target.value.trim();
    if (value === "") {
      toast.error("Bình luận không thể trống");
      return;
    }
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
        }
      }
    } catch (error) {}
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
  const editComment = async (commentId, content) => {
    console.log(commentId, content);
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_EDIT_COMMENT,
        {
          commentId: commentId,
          content: content,
        }
      );
      if (response) {
        let { comments } = postDetail;
        let newComments = comments.filter(
          (comment) => comment.commentId !== commentId
        );
        newComments.push(response.data);
        setPostDetail({ ...postDetail, comments: newComments });
        setActiveComment(null);
      }
    } catch (error) {}
  };
  return (
    <>
      {isAllowComment ? (
        <>
          <CommentBar handleSubmit={addComment} />
          <CommentsList
            rootComments={rootComments}
            getReplies={getReplies}
            deleteComment={deleteComment}
            addComment={addComment}
            editComment={editComment}
          />
        </>
      ) : (
        <>
          <CommentBar handleSubmit={addComment} noComment />
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            borderRadius={"10px"}
            p={"10px 0"}
          >
            <Text color="middleText.main">
              Tác giả đã tắt tính năng bình luận của bài viết này
            </Text>
          </Box>
        </>
      )}
    </>
  );
}
