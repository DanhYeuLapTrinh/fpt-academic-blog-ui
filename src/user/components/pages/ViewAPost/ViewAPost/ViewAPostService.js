import React, { useEffect, useState } from "react";
import ViewAPost from "./ViewAPost";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import ViewAPostSkeleton from "../../../organisms/Skeleton/ViewAPostSkeleton/ViewAPostSkeleton";
import usePost from "../../../../hooks/usePost";

export default function ViewAPostService() {
  const { slug } = useParams();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const {postDetail, setPostDetail} = usePost();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavored, setIsFavored] = useState(false);
  const [vote, setVote] = useState(0);
  // check xem vote gì trước up down ""
  const [select, setSelect] = useState("");
  // check xem đã vote chưa true false
  const [voted, setVoted] = useState();
  useEffect(() => {
    try {
      const fetchData = async () => {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_A_POST,
          {
            slug: slug,
          }
        );
        setPostDetail(response?.data);
        setVote(response?.data?.numOfUpVote - response?.data?.numOfDownVote);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let favorList = await axiosPrivate.get(
          process.env.REACT_APP_VIEW_FAVORITE
        );

        if (favorList) {
          let isFavored = favorList?.postDetail?.some(
            (favor) => favor?.postListDto?.postId === postDetail.postId
          );
          setIsFavored(isFavored);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (postDetail) fetchData();
  }, [postDetail]);

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
          let isFollowingUser = followersList?.postDetail?.some(
            (follower) => follower.id === auth.id
          );
          setIsFollowing(isFollowingUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (postDetail && auth.id !== postDetail?.userId) fetchData();
  }, [postDetail]);

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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
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
    } catch (error) {}
  };

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
          if (response?.data[0]?.typeOfVote === "up") {
            setSelect("up");
            setVoted(true);
          } else if (response?.data[0]?.typeOfVote === "down") {
            setSelect("down");
            setVoted(true);
          }
        }
      } catch (error) {}
    };
    if (vote) fetchData();
  }, [vote]);

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
    } catch (error) {}
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
    } catch (error) {}
  };
  return (
    <>
      {!postDetail ? (
        <ViewAPostSkeleton />
      ) : (
        <ViewAPost
          data={postDetail}
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
