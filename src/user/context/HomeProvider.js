import React, { createContext, useState } from "react";
const HomeContext = createContext();
export default function HomeProvider({ children }) {
  const [trendingPosts, setTrendingPosts] = useState();
  const [rewardedPosts, setRewardedPosts] = useState();
  const [isLoading, setIsLoading] = useState(false)
  return (
    <HomeContext.Provider
      value={{
        trendingPosts,
        setTrendingPosts,
        rewardedPosts,
        setRewardedPosts,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export { HomeContext };
