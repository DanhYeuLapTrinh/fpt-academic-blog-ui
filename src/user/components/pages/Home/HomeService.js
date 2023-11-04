import React, { useEffect } from "react";
import Home from "./Home";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useHome from "../../../hooks/useHome";

export default function HomeService() {
  const { isLoading, setIsLoading } = useHome();
  const axiosPrivate = useAxiosPrivate();
  const {
    latestPosts,
    setLatestPosts,
    trendingPosts,
    setTrendingPosts,
    rewardedPosts,
    setRewardedPosts,
    allPosts,
    setAllPosts,
  } = useHome();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let trendingPosts = await axiosPrivate.get(
          process.env.REACT_APP_TRENDING_POSTS
        );
        setTrendingPosts(trendingPosts?.data?.slice(0, 4));
        let rewardedPosts = await axiosPrivate.get(
          process.env.REACT_APP_REWARDED_POSTS
        );
        setRewardedPosts(rewardedPosts?.data);
        let latestPosts = await axiosPrivate.get(
          process.env.REACT_APP_LATEST_POSTS
        );
        setLatestPosts(latestPosts?.data?.slice(0, 4));
        let allPosts = await axiosPrivate.get(process.env.REACT_APP_ALL_POSTS);
        setAllPosts(allPosts?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Home
      trendingPosts={trendingPosts}
      rewardedPosts={rewardedPosts}
      latestPosts={latestPosts}
      allPosts={allPosts}
    />
  );
}
