import React, { useEffect, useState } from "react";
import ViewAPost from "./ViewAPost";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";

export default function ViewAPostService() {
  const { slug } = useParams();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavored, setIsFavored] = useState(false)

  useEffect(() => {
    try {
      const fetchData = async () => {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_A_POST,
          {
            slug: slug,
          }
        );
        setData(response.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let favorList = await axiosPrivate.get(process.env.REACT_APP_VIEW_FAVORITE);

        if (favorList) {
          let isFavored = favorList?.data?.some(
            (favor) => favor?.postListDto?.postId === data.postId
          );
          setIsFavored(isFavored);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (data) fetchData();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let followersList = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_FOLLOWERS,
          {
            userId: data?.userId,
          }
        );

        if (followersList) {
          let isFollowingUser = followersList?.data?.some(
            (follower) => follower.id === auth.id
          );
          setIsFollowing(isFollowingUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (data && auth.id !== data?.userId) fetchData();
  }, [data]);

  const followAccount = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_FOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: data?.userId,
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
          userId: data?.userId,
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
          postId: data?.postId,
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
          postId: data?.postId,
        }
      );
      if (response) {
        setIsFavored(false);
      }
    } catch (error) {}
  };

  return (
    <>
      {data && (
        <ViewAPost
          data={data}
          isFollowing={isFollowing}
          followAccount={followAccount}
          unfollowAccount={unfollowAccount}
          isFavored={isFavored}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
        />
      )}
    </>
  );
}
