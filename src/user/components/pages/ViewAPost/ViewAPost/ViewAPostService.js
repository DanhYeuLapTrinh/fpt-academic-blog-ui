import React, { useEffect } from "react";
import ViewAPost from "./ViewAPost";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import ViewAPostSkeleton from "../../../organisms/Skeleton/ViewAPostSkeleton/ViewAPostSkeleton";
import usePost from "../../../../hooks/usePost";
import { toast } from "react-toastify";
import usePostAPI from ".";
import useHomeAPI from "../../Home";

export default function ViewAPostService() {
  const { slug } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const {
    postDetail,
    setPostDetail,
    isFollowing,
    setHistoryDetail,
    isFavored,
    upvote,
    select,
    setSelect,
    setIsFavored,
  } = usePost();

  const {
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
  } = usePostAPI();
  const { getUserSkills } = useHomeAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postDetails = await getPostDetails(slug);
        window.scrollTo(0, 0);
        setPostDetail(postDetails);
        const isFavored = await checkFavoredPost(postDetails?.postId);
        setIsFavored(isFavored);
        await checkPostVote(postDetails?.postId);
        if (auth?.id !== postDetails?.userId) {
          await checkIsFollowing(postDetails?.userId);
        }
        if (postDetails?.is_edited) {
          const postEditHistory = await getPostEditHistory(postDetails?.postId);
          setHistoryDetail(postEditHistory[0]);
        }
        await getUserSkills();
        await getReportReasons();
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
  }, [slug]);

  const handleActions = async (action) => {
    try {
      switch (action) {
        case "follow":
          await followAccount(auth?.id, postDetail?.userId);
          break;
        case "unfollow":
          await unfollowAccount(auth?.id, postDetail?.userId);
          break;
        case "save":
          await addToFavorite(postDetail?.postId);
          break;
        case "unsave":
          await removeFromFavorite(postDetail?.postId);
          break;
        case "upvote":
          await handleUpvote(postDetail?.postId);
          break;
        case "downvote":
          await handleDownvote(postDetail?.postId);
          break;
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
          isFollowing={isFollowing}
          isFavored={isFavored}
          upvote={upvote}
          select={select}
          setSelect={setSelect}
          handleActions={handleActions}
        />
      )}
    </>
  );
}
