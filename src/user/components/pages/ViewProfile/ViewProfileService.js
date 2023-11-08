import React, { useEffect, useState } from "react";
import ViewProfile from "./ViewProfile";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { sortByPropertyName } from "../../../utils/StringMethod";
import useAuth from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";
import { async } from "q";

export default function ViewProfileService() {
  const { id } = useParams();
  const profileID = Number(id);
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState({});
  const { followerList, setFollowerList } = useProfile();
  const [isFollowing, setIsFollowing] = useState(false);
  const auth = useAuth();
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let profileInfo = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_PROFILE,
          {
            userId: profileID,
          }
        );
        setUser(profileInfo?.data);
        let followersList = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_FOLLOWERS,
          {
            userId: profileID,
          }
        );

        if (followersList) {
          setFollowerList(followersList?.data);
          const isFollowingUser = followersList?.data?.some(
            (follower) => follower.id === auth.id
          );
          setIsFollowing(isFollowingUser);
        }
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  const sort = sortByPropertyName(user?.postList, "", "postId");

  const followAccount = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_FOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: profileID,
        }
      );
      if (response) {
        setIsFollowing(true);
        setUser((prevUser) => ({
          ...prevUser,
          numOfFollower: prevUser.numOfFollower + 1,
        }));
      }
    } catch (error) {}
  };

  const unfollowAccount = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_UNFOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: profileID,
        }
      );
      if (response) {
        setIsFollowing(false);
        setUser((prevUser) => ({
          ...prevUser,
          numOfFollower: prevUser.numOfFollower - 1,
        }));
      }
    } catch (error) {}
  };
  return (
    <ViewProfile
      url={user?.coverURL}
      height="218px"
      avatarURL={user?.profileUrl}
      accountName={user?.fullname}
      numOfPost={user?.numOfPost}
      numOfFollower={user?.numOfFollower}
      userStory={user?.userStory}
      postList={sort}
      userId={user?.userId}
      slug={id}
      followAccount={followAccount}
      unfollowAccount={unfollowAccount}
      isFollowing={isFollowing}
    />
  );
}
