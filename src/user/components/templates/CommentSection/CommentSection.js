import React, { useState } from "react";
import CommentBar from "../../organisms/CommentBar/CommentBar";
import CommentsList from "../../organisms/CommentsList/CommentsList";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePost from "../../../hooks/usePost";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import Text from "../../atoms/Text/Text";
import { useNavigate } from "react-router-dom";

export default function CommentSection({ rootComments, getReplies }) {
  const axiosPrivate = useAxiosPrivate();
  const { postDetail, setPostDetail, setActiveComment, isAllowComment } =
    usePost();
  const navigate = useNavigate();
  const auth = useAuth();
  const addComment = async (
    e,
    parentId = null,
    commentId = null,
    userId = null
  ) => {
    let value = e.target.value.trim();
    if (value === "") {
      toast.error("Bình luận không thể trống");
      return;
    }
    e.preventDefault();
    if (parentId && commentId && userId) {
      try {
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
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
      try {
        if (userId !== auth?.id) {
          await axiosPrivate.post(process.env.REACT_APP_SEND_NOTIFICATION, {
            content: `đã phản hồi bình luận của bạn: ${value}`,
            relatedId: postDetail?.postId,
            type: "comment",
            userId: userId,
            commentId: commentId,
          });
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
      try {
        if (auth.id !== postDetail?.userId && userId !== postDetail?.userId) {
          await axiosPrivate.post(process.env.REACT_APP_SEND_NOTIFICATION, {
            content: `đã bình luận về bài viết của bạn: ${value}`,
            relatedId: postDetail?.postId,
            type: "post",
            userId: postDetail?.userId,
            commentId: commentId,
          });
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    } else {
      try {
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
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
      try {
        if (auth.id !== postDetail?.userId) {
          await axiosPrivate.post(process.env.REACT_APP_SEND_NOTIFICATION, {
            content: `đã bình luận về bài viết của bạn: ${value}`,
            relatedId: postDetail?.postId,
            type: "post",
            userId: postDetail?.userId,
            commentId: commentId,
          });
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
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
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };
  const editComment = async (commentId, content) => {
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
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
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
