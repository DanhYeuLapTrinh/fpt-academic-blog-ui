import React, { createContext, useState } from "react";
const HomeContext = createContext();
export default function HomeProvider({ children }) {
  const [trendingPosts, setTrendingPosts] = useState();
  const [rewardedPosts, setRewardedPosts] = useState();
  return (
    <HomeContext.Provider
      value={{
        trendingPosts,
        setTrendingPosts,
        rewardedPosts,
        setRewardedPosts,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export { HomeContext };
