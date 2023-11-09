import React, { useEffect } from "react";
import RewardedPostsSeeMore from "./RewardedPostsSeeMore";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useHome from "../../../../hooks/useHome";
import { sortByPropertyName } from "../../../../utils/StringMethod";

export default function RewardedPostsSeeMoreService() {
  const axiosPrivate = useAxiosPrivate();
  const { rewardedPosts, setRewardedPosts } = useHome();
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let rewardedPosts = await axiosPrivate.get(
          process.env.REACT_APP_REWARDED_POSTS
        );
        setRewardedPosts(rewardedPosts?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  let sortedRewardedPosts = sortByPropertyName(rewardedPosts, "", "postId");

  return <RewardedPostsSeeMore data={sortedRewardedPosts} />;
}
