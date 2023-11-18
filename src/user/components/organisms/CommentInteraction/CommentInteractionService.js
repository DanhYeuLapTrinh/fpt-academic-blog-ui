import React, { useEffect, useState } from "react";
import CommentInteraction from "./CommentInteraction";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import usePost from "../../../hooks/usePost";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CommentInteractionService({ comment, ...props }) {
  const [vote, setVote] = useState(props.vote);
  const [select, setSelect] = useState();
  const [voted, setVoted] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { postDetail, voteList } = usePost();
  const navigate = useNavigate()
  useEffect(() => {
    if (voteList) {
      let item = voteList.find((x) => x.commentId === comment.commentId);
      if (item?.typeOfVote === "up") {
        setSelect("up");
        setVoted(true);
      } else if (item?.typeOfVote === "down"){
        setSelect("down");
        setVoted(true);
      }
    }
  }, [voteList]);

  const handleUpvoteComment = async () => {
    try {
      if (!voted) {
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: postDetail?.postId,
          commentId: comment.commentId,
          typeOfVote: "up",
        });
        setSelect("up");
        setVoted(true);
        setVote(vote + 1);
      } else if (select === "up") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: postDetail?.postId,
          commentId: comment.commentId,
        });
        setSelect("");
        setVoted(false);
        setVote(vote - 1);
      } else if (select === "down") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: postDetail?.postId,
          commentId: comment.commentId,
        });
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: postDetail?.postId,
          commentId: comment.commentId,
          typeOfVote: "up",
        });
        setSelect("up");
        setVoted(true);
        setVote(vote + 2);
      }
    } catch (error) {
      if(error.response.status === 405){
        toast.error("Tài khoản của bạn đã bị khóa")
        navigate("/login", { replace: true });
        localStorage.removeItem("auth")
      }
    }
  };

  const handleDownvoteComment = async () => {
    try {
      if (!voted) {
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: postDetail?.postId,
          commentId: comment.commentId,
          typeOfVote: "down",
        });
        setSelect("down");
        setVoted(true);
        setVote(vote - 1);
      } else if (select === "down") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: postDetail?.postId,
          commentId: comment.commentId,
        });
        setSelect("");
        setVoted(false);
        setVote(vote + 1);
      } else if (select === "up") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: postDetail?.postId,
          commentId: comment.commentId,
        });
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: postDetail?.postId,
          commentId: comment.commentId,
          typeOfVote: "down",
        });
        setSelect("down");
        setVoted(true);
        setVote(vote - 2);
      }
    } catch (error) {
      if(error.response.status === 405){
        toast.error("Tài khoản của bạn đã bị khóa")
        navigate("/login", { replace: true });
        localStorage.removeItem("auth")
      }
    }
  };
  return (
    <CommentInteraction
      vote={vote}
      select={select}
      setSelect={setSelect}
      handleUpvoteComment={handleUpvoteComment}
      handleDownvoteComment={handleDownvoteComment}
    />
  );
}
