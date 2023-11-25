import React, { useEffect, useState } from "react";
import Home from "./Home";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useHome from "../../../hooks/useHome";
import useProfile from "../../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useHomeAPI from ".";

export default function HomeService() {
  const {
    latestPosts,
    setLatestPosts,
    trendingPosts,
    setTrendingPosts,
    rewardedPosts,
    setRewardedPosts,
    shortPosts,
    setShortPosts,
    trendingTags,
    setTrendingTags,
    qaList,
    setQAList,
  } = useHome();
  const navigate = useNavigate();
  const {
    getTrendingPosts,
    getLatestPosts,
    getRewardedPosts,
    getTrendingTags,
    getShortPosts,
    getQAList,
  } = useHomeAPI();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingPosts = await getTrendingPosts();
        setTrendingPosts(trendingPosts);
        const latestPosts = await getLatestPosts();
        setLatestPosts(latestPosts);
        const rewardedPosts = await getRewardedPosts();
        setRewardedPosts(rewardedPosts);
        const trendingTags = await getTrendingTags();
        setTrendingTags(trendingTags);
        const shortPosts = await getShortPosts();
        setShortPosts(shortPosts);
        const qaList = await getQAList();
        setQAList(qaList);
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
