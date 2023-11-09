import React, { useEffect } from "react";
import LatestPostsSeeMore from "./LatestPostsSeeMore";
import useHome from "../../../../hooks/useHome";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export default function LatestPostsSeeMoreService() {
  const { latestPosts, setLatestPosts } = useHome();
  const axiosPrivate = useAxiosPrivate();
  window.scrollTo(0, 0);
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
  return <LatestPostsSeeMore data={latestPosts} />;
}