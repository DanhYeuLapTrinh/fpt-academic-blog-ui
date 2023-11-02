import React, { useEffect } from "react";
import Home from "./Home";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useHome from "../../../hooks/useHome";

export default function HomeService() {
  const axiosPrivate = useAxiosPrivate();
  const {trendingPosts, setTrendingPosts} = useHome()
  useEffect(() => {
    const fetchData = async () => {
      let response = await axiosPrivate.get(
        process.env.REACT_APP_TRENDING_POSTS
      );
      setTrendingPosts(response?.data?.slice(0,4))
    };
    fetchData();
  }, []);
  return <Home trendingPosts={trendingPosts}/>;
}
