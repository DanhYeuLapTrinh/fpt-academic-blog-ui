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
  const { followerList, setFollowerList, user, setUser, setSelected } =
    useProfile();
  const [isFollowing, setIsFollowing] = useState(false);
  const auth = useAuth();
  useEffect(() => {
    setSelected("Bài viết");
    window.scrollTo(0, 0);
  }, []);

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
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let followersList = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_FOLLOWERS,
          {
            userId: profileID,
          }
        );
        if (followersList) {
          setFollowerList(followersList?.data);
          let isFollowingUser = followersList?.data?.some(
            (follower) => follower.id === auth.id
          );
          setIsFollowing(isFollowingUser);
        }
      } catch (error) {}
    };
    if (profileID !== auth.id) fetchData();
  }, [profileID]);

  const sortedPostsList = user?.postList?.sort(
    (a, b) =>
      new Date(b.dateOfPost).getTime() - new Date(a.dateOfPost).getTime()
  );

  const sortedQAList = user?.qaList?.sort(
    (a, b) =>
      new Date(b.dateOfPost).getTime() - new Date(a.dateOfPost).getTime()
  );

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
        setFollowerList((prevFollowerList) => [
          ...prevFollowerList,
          {
            id: auth.id,
            fullName: auth.user,
            profileUrl: auth.profileURL,
          },
        ]);
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
        setFollowerList((prevFollowerList) => {
          let newFollowerList = prevFollowerList.filter(
            (follower) => follower.id !== auth.id
          );
          return newFollowerList;
        });
      }
    } catch (error) {}
  };

  return (
    <ViewProfile
      url={user?.coverURL}
      height="330px"
      accountName={user?.fullname}
      numOfPost={user?.numOfPost}
      numOfFollower={user?.numOfFollower}
      userStory={user?.userStory}
      profileUrl={user?.profileUrl}
      coverUrl={user?.coverUrl}
      postList={sortedPostsList}
      qaList={sortedQAList}
      userId={user?.userId}
      slug={id}
      followAccount={followAccount}
      unfollowAccount={unfollowAccount}
      isFollowing={isFollowing}
    />
  );
}
