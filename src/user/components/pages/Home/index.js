import React from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";
import useHome from "../../../hooks/useHome";

export default function useHomeAPI() {
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();
  const { setAvatarURL, setUser } = useProfile();
  const { setUnreadNotifications, setNotifications } = useHome();

  const setUserAvatar = async () => {
    let profileAvatar = await axiosPrivate.post(
      process.env.REACT_APP_VIEW_PROFILE,
      {
        userId: auth.id,
      }
    );
    setAvatarURL(profileAvatar?.data?.profileUrl);
    setUser(profileAvatar?.data);
  };

  const getUserSkills = async () => {
    let userSkills = await axiosPrivate.get(
      process.env.REACT_APP_GET_USER_SKILLS
    );
    setUser((prevUser) => ({
      ...prevUser,
      skills: userSkills?.data,
    }));
  };

  const getNotifications = async () => {
    let notifications = await axiosPrivate.get(
      process.env.REACT_APP_VIEW_NOTIFICATION
    );
    notifications = notifications?.data?.sort(
      (a, b) =>
        new Date(b.notifyTime).getTime() - new Date(a.notifyTime).getTime()
    );
    setNotifications(notifications);
    setUnreadNotifications((prev) => [
      ...notifications.filter((x) => x.read === false),
    ]);
  };

  const getTrendigPosts = async () => {
    let trendingPosts = await axiosPrivate.get(
      process.env.REACT_APP_TRENDING_POSTS
    );
    return trendingPosts?.data;
  };

  const getCategories = async () => {
    let categories = await axiosPrivate.get(process.env.REACT_APP_GET_CATEGORY);
    return categories?.data;
  };

  const getLatestPosts = async () => {
    let latestPosts = await axiosPrivate.get(
      process.env.REACT_APP_LATEST_POSTS
    );
    return latestPosts?.data;
  };
  const getRewardedPosts = async () => {
    let rewardedPosts = await axiosPrivate.get(
      process.env.REACT_APP_REWARDED_POSTS
    );
    return rewardedPosts?.data;
  };
  const getTrendingTags = async () => {
    let trendingTags = await axiosPrivate.get(
      process.env.REACT_APP_TRENDING_TAGS
    );
    return trendingTags?.data;
  };
  const getShortPosts = async () => {
    let shortPosts = await axiosPrivate.get(process.env.REACT_APP_SHORT_POSTS);
    return shortPosts?.data;
  };
  const getQAList = async () => {
    let qaList = await axiosPrivate.get(process.env.REACT_APP_QA_LIST);
    return qaList?.data;
  };
  return {
    getUserSkills,
    setUserAvatar,
    getNotifications,
    getCategories,
    getTrendigPosts,
    getLatestPosts,
    getRewardedPosts,
    getTrendingTags,
    getShortPosts,
    getQAList,
  };
}
