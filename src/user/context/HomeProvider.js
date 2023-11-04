import React, { createContext, useState } from "react";
const HomeContext = createContext();
export default function HomeProvider({ children }) {
  const [trendingPosts, setTrendingPosts] = useState();
  const [rewardedPosts, setRewardedPosts] = useState();
  const [latestPosts, setLatestPosts] = useState();
  const [allPosts, setAllPosts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <HomeContext.Provider
      value={{
        trendingPosts,
        setTrendingPosts,
        rewardedPosts,
        setRewardedPosts,
        isLoading,
        setIsLoading,
        latestPosts,
        setLatestPosts,
        allPosts,
        setAllPosts,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export { HomeContext };
