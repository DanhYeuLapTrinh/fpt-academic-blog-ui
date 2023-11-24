import React from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import usePost from "../../../../hooks/usePost";
import useAuth from "../../../../hooks/useAuth";

export default function usePostAPI() {
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();
  const {
    postDetail,
    setVoteList,
    setIsAllowComment,
    setIsFollowing,
    setIsFavored,
    setVote,
    setSelect,
    setVoted,
    voted,
    select,
    vote,
    setReportReasons,
  } = usePost();
  const getPostDetails = async (slug) => {
    let postDetails = await axiosPrivate.post(
      process.env.REACT_APP_VIEW_A_POST,
      {
        slug: slug,
      }
    );
    setIsAllowComment(postDetails?.data?.allowComment);
    setVote(postDetails?.data?.numOfUpVote - postDetails?.data?.numOfDownVote);
    return postDetails?.data;
  };

  const getPostEditHistory = async (postId) => {
    let postEditHistory = await axiosPrivate.post(
      process.env.REACT_APP_GET_POST_HISTORY,
      {
        postId: postId,
      }
    );
    return postEditHistory?.data;
  };

  const checkPostVote = async (postId) => {
    let postVote = await axiosPrivate.post(process.env.REACT_APP_CHECK_VOTE, {
      postId: postId,
    });
    setVoteList(postVote?.data);
    let item = postVote?.data?.find((x) => x.commentId === null);
    if (!item) {
      setSelect("");
      setVoted(false);
    } else {
      if (item?.typeOfVote == "up") {
        setSelect("up");
        setVoted(true);
      } else if (item?.typeOfVote == "down") {
        setSelect("down");
        setVoted(true);
      }
    }
  };

  const checkFavoredPost = async (postId) => {
    let favorList = await axiosPrivate.get(process.env.REACT_APP_VIEW_FAVORITE);
    let isFavored = favorList?.data?.some(
      (favor) => favor?.postListDto?.postId === postId
    );
    return isFavored;
  };

  const checkIsFollowing = async (userId) => {
    let followersList = await axiosPrivate.post(
      process.env.REACT_APP_VIEW_FOLLOWERS,
      {
        userId: userId,
      }
    );
    let isFollowingUser = followersList?.data?.some(
      (follower) => follower.id === auth.id
    );
    setIsFollowing(isFollowingUser);
  };
  const getReportReasons = async () => {
    let reportReasons = await axiosPrivate.get(
      process.env.REACT_APP_REPORT_REASONS
    );
    setReportReasons(reportReasons?.data);
  };
  const followAccount = async (authID, userId) => {
    let response = await axiosPrivate.post(
      process.env.REACT_APP_FOLLOW_ACCOUNT,
      {
        followedBy: authID,
        userId: userId,
      }
    );
    if (response) {
      setIsFollowing(true);
    }
  };

  const unfollowAccount = async (authID, userId) => {
    let response = await axiosPrivate.post(
      process.env.REACT_APP_UNFOLLOW_ACCOUNT,
      {
        followedBy: authID,
        userId: userId,
      }
    );
    if (response) {
      setIsFollowing(false);
    }
  };

  const addToFavorite = async (postId) => {
    await axiosPrivate.post(process.env.REACT_APP_ADD_TO_FAVORITE, {
      postId: postId,
    });
    setIsFavored(true);
  };

  const removeFromFavorite = async (postId) => {
    await axiosPrivate.post(process.env.REACT_APP_REMOVE_FROM_FAVORITE, {
      postId: postId,
    });
    setIsFavored(false);
  };

  const handleUpvote = async (postId) => {
    if (!voted) {
      await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
        postId: postId,
        typeOfVote: "up",
      });
      setSelect("up");
      setVoted(true);
      setVote(vote + 1);
    } else if (select === "up") {
      await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
        postId: postId,
      });
      setSelect("");
      setVoted(false);
      setVote(vote - 1);
    } else if (select === "down") {
      await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
        postId: postId,
      });
      await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
        postId: postId,
        typeOfVote: "up",
      });
      setSelect("up");
      setVoted(true);
      setVote(vote + 2);
    }
  };

  const handleDownvote = async () => {
    if (!voted) {
      await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
        postId: postDetail?.postId,
        typeOfVote: "down",
      });
      setSelect("down");
      setVoted(true);
      setVote(vote - 1);
    } else if (select === "down") {
      await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
        postId: postDetail?.postId,
      });
      setSelect("");
      setVoted(false);
      setVote(vote + 1);
    } else if (select === "up") {
      await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
        postId: postDetail?.postId,
      });
      await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
        postId: postDetail?.postId,
        typeOfVote: "down",
      });
      setSelect("down");
      setVoted(true);
      setVote(vote - 2);
    }
  };

  return {
    getPostDetails,
    getPostEditHistory,
    checkPostVote,
    checkFavoredPost,
    checkIsFollowing,
    followAccount,
    unfollowAccount,
    addToFavorite,
    removeFromFavorite,
    handleUpvote,
    handleDownvote,
    getReportReasons,
  };
}
