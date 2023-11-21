import React, { useEffect, useState } from "react";
import ViewAPost from "./ViewAPost";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import ViewAPostSkeleton from "../../../organisms/Skeleton/ViewAPostSkeleton/ViewAPostSkeleton";
import usePost from "../../../../hooks/usePost";
import { toast } from "react-toastify";

export default function ViewAPostService() {
  const { slug } = useParams();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const {
    postDetail,
    setPostDetail,
    setVoteList,
    setReportReasons,
    setHistoryDetail,
    setIsAllowComment,
  } = usePost();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavored, setIsFavored] = useState(false);
  const [vote, setVote] = useState(0);
  // check xem vote gì trước up down ""
  const [select, setSelect] = useState("");
  // check xem đã vote chưa true false
  const [voted, setVoted] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_A_POST,
          {
            slug: slug,
          }
        );
        setPostDetail(response?.data);
        setIsAllowComment(response?.data?.allowComment);
        setVote(response?.data?.numOfUpVote - response?.data?.numOfDownVote);
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        } else if (error?.response?.status === 404) {
          navigate("/404-not-found", { replace: true });
        }
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_GET_POST_HISTORY,
          {
            postId: postDetail.postId,
          }
        );
        if (response?.data.length > 0) {
          setHistoryDetail(response?.data[0]);
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    if (postDetail?.is_edited) {
      fetchData();
    } else {
      setHistoryDetail([]);
    }
    return () => setHistoryDetail([]);
  }, [postDetail?.postId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_CHECK_VOTE,
          {
            postId: postDetail?.postId,
          }
        );
        if (response?.data) {
          setVoteList(response?.data);
          let item = response?.data.find((x) => x.commentId === null);
          if (item?.typeOfVote === "up") {
            setSelect("up");
            setVoted(true);
          } else if (item?.typeOfVote === "down") {
            setSelect("down");
            setVoted(true);
          }
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    fetchData();
  }, [postDetail?.postId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let favorList = await axiosPrivate.get(
          process.env.REACT_APP_VIEW_FAVORITE
        );

        if (favorList) {
          let isFavored = favorList?.data?.some(
            (favor) => favor?.postListDto?.postId === postDetail.postId
          );
          setIsFavored(isFavored);
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    if (postDetail) fetchData();
  }, [postDetail?.postId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let followersList = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_FOLLOWERS,
          {
            userId: postDetail?.userId,
          }
        );

        if (followersList) {
          let isFollowingUser = followersList?.data?.some(
            (follower) => follower.id === auth.id
          );
          setIsFollowing(isFollowingUser);
        }
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    if (postDetail && auth.id !== postDetail?.userId) fetchData();
  }, [postDetail?.postId]);

  const followAccount = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_FOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: postDetail?.userId,
        }
      );
      if (response) {
        setIsFollowing(true);
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  const unfollowAccount = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_UNFOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: postDetail?.userId,
        }
      );
      if (response) {
        setIsFollowing(false);
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  const addToFavorite = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_ADD_TO_FAVORITE,
        {
          postId: postDetail?.postId,
        }
      );
      if (response) {
        setIsFavored(true);
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  const removeFromFavorite = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_REMOVE_FROM_FAVORITE,
        {
          postId: postDetail?.postId,
        }
      );
      if (response) {
        setIsFavored(false);
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get(
          process.env.REACT_APP_REPORT_REASONS
        );
        setReportReasons(response?.data);
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    fetchData();
  }, []);

  const handleUpvote = async () => {
    try {
      if (!voted) {
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: postDetail?.postId,
          typeOfVote: "up",
        });
        setSelect("up");
        setVoted(true);
        setVote(vote + 1);
      } else if (select === "up") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: postDetail?.postId,
        });
        setSelect("");
        setVoted(false);
        setVote(vote - 1);
      } else if (select === "down") {
        await axiosPrivate.post(process.env.REACT_APP_REMOVE_VOTE, {
          postId: postDetail?.postId,
        });
        await axiosPrivate.post(process.env.REACT_APP_ADD_VOTE, {
          postId: postDetail?.postId,
          typeOfVote: "up",
        });
        setSelect("up");
        setVoted(true);
        setVote(vote + 2);
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  const handleDownvote = async () => {
    try {
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
      {!postDetail ? (
        <ViewAPostSkeleton />
      ) : (
        <ViewAPost
          postDetail={postDetail}
          auth={auth}
          isFollowing={isFollowing}
          followAccount={followAccount}
          unfollowAccount={unfollowAccount}
          isFavored={isFavored}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
          vote={vote}
          select={select}
          setSelect={setSelect}
          handleUpvote={handleUpvote}
          handleDownvote={handleDownvote}
        />
      )}
    </>
  );
}
