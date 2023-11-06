import React, { useEffect, useState } from "react";
import ViewAPost from "./ViewAPost";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";

export default function ViewAPostService() {
  const { slug } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [data, setData] = useState();
  const auth = useAuth();

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
        
        let followersList = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_FOLLOWERS,
          {
            userId: response?.data.userId,
          }
        );

        if (followersList) {
          let isFollowingUser = followersList?.data?.some(
            (follower) => follower.id === auth.id
          );
          setIsFollowing(isFollowingUser);
        }
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
  return <>{data && <ViewAPost data={data} isFollowing={isFollowing} followAccount={followAccount} unfollowAccount={unfollowAccount}/>}</>;
}
