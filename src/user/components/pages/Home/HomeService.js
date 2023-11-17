import React, { useEffect, useState } from "react";
import Home from "./Home";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useHome from "../../../hooks/useHome";
import useProfile from "../../../hooks/useProfile";

export default function HomeService() {
  const axiosPrivate = useAxiosPrivate();
  const {
    latestPosts,
    setLatestPosts,
    trendingPosts,
    setTrendingPosts,
    rewardedPosts,
    setRewardedPosts,
    allPosts,
    shortPosts,
    setShortPosts,
    setUserAccounts,
    trendingTags,
    setTrendingTags,
    qaList,
    setQAList,
    categoryList,
  } = useHome();
  const { avatarURL } = useProfile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let trendingPosts = await axiosPrivate.get(
          process.env.REACT_APP_TRENDING_POSTS
        );
        setTrendingPosts(trendingPosts?.data?.slice(0, 4));
      } catch (error) {}
    };
    if (avatarURL) fetchData();
  }, [avatarURL]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let latestPosts = await axiosPrivate.get(
          process.env.REACT_APP_LATEST_POSTS
        );
        setLatestPosts(latestPosts?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let rewardedPosts = await axiosPrivate.get(
          process.env.REACT_APP_REWARDED_POSTS
        );
        setRewardedPosts(rewardedPosts?.data);
      } catch (error) {}
    };
    if (latestPosts) fetchData();
  }, [latestPosts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let trendingTags = await axiosPrivate.get(
          process.env.REACT_APP_TRENDING_TAGS
        );
        setTrendingTags(trendingTags?.data);
      } catch (error) {}
    };
    if (rewardedPosts) fetchData();
  }, [rewardedPosts]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let shortPosts = await axiosPrivate.get(
          process.env.REACT_APP_SHORT_POSTS
        );
        setShortPosts(shortPosts?.data);
      } catch (error) {}
    };
    if (trendingTags) fetchData();
  }, [trendingTags]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let qaList = await axiosPrivate.get(process.env.REACT_APP_QA_LIST);
        setQAList(qaList?.data);
      } catch (error) {}
    };
    if (shortPosts) fetchData();
  }, [shortPosts]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let userAccounts = await axiosPrivate.get(
  //         process.env.REACT_APP_ACCOUNTS_LIST
  //       );
  //       setUserAccounts(userAccounts?.data);
  //     } catch (error) {}
  //   };
  //   if (qaList) fetchData();
  // }, [qaList]);

  return (
    <Home
      trendingPosts={trendingPosts}
      rewardedPosts={rewardedPosts}
      latestPosts={latestPosts}
      shortPosts={shortPosts}
      trendingTags={trendingTags}
      qaList={qaList}
    />
  );
}
