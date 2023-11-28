import React, { useEffect } from "react";
import ViewAPost from "./ViewAPost";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import ViewAPostSkeleton from "../../../organisms/Skeleton/ViewAPostSkeleton/ViewAPostSkeleton";
import usePost from "../../../../hooks/usePost";
import { toast } from "react-toastify";
import usePostAPI from ".";
import useHomeAPI from "../../Home";
import useHome from "../../../../hooks/useHome";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export default function ViewAPostService() {
  const { slug } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const {
    postDetail,
    setPostDetail,
    isFollowing,
    setHistoryDetail,
    isFavored,
    upvote,
    downvote,
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
  const { deleteNotification } = useHome();
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
        await getReportReasons();
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        } else if (error?.response?.status === 404) {
          console.log(deleteNotification?.relatedId + "deleteNotification");
          navigate("/404-not-found", { replace: true });

          if (deleteNotification?.type === "post") {
            await axiosPrivate.post(process.env.REACT_APP_DELETE_NOTIFICATION, {
              content: deleteNotification?.content?.includes(
                "Bài viết của bạn đã được duyệt"
              )
                ? "đã được duyệt"
                : "bị từ chối",
              relatedId: deleteNotification?.relatedId,
              type: "post",
              userId: deleteNotification?.userId,
            });
          }
        }
      }
    };
    fetchData();
    return () => {
      setPostDetail(null);
    };
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
  if (postDetail?.pending && auth.id === postDetail?.userId) {
    navigate(`/edit/${postDetail?.slug}`, { replace: true });
  }
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
          downvote={downvote}
          select={select}
          setSelect={setSelect}
          handleActions={handleActions}
        />
      )}
    </>
  );
}
