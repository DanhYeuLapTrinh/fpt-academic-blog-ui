import React, { useEffect } from "react";
import TrendingPostsSeeMore from "./TrendingPostsSeeMore";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useHome from "../../../../hooks/useHome";

export default function TrendingPostsSeeMoreService() {
  const axiosPrivate = useAxiosPrivate();
  const { trendingPosts, setTrendingPosts } = useHome();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let trendingPosts = await axiosPrivate.get(
          process.env.REACT_APP_TRENDING_POSTS
        );
        setTrendingPosts(trendingPosts?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return <TrendingPostsSeeMore data={trendingPosts} />;
}
