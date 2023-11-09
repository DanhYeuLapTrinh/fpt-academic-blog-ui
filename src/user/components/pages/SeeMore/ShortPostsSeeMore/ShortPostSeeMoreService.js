import React, { useEffect } from "react";
import ShortPostSeeMore from "./ShortPostSeeMore";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useHome from "../../../../hooks/useHome";
import { sortByPropertyName } from "../../../../utils/StringMethod";

export default function ShortPostSeeMoreService() {
  const { shortPosts, setShortPosts } = useHome();
  const axiosPrivate = useAxiosPrivate();
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let shortPosts = await axiosPrivate.get(
          process.env.REACT_APP_SHORT_POSTS
        );
        setShortPosts(shortPosts?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  let sortedShortPosts = sortByPropertyName(shortPosts, "", "postId");
  return <ShortPostSeeMore data={sortedShortPosts}/>;
}
