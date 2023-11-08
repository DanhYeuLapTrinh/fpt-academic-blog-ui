import React, { createContext, useState } from "react";
const HomeContext = createContext();
export default function HomeProvider({ children }) {
  const [trendingPosts, setTrendingPosts] = useState();
  const [rewardedPosts, setRewardedPosts] = useState();
  const [latestPosts, setLatestPosts] = useState();
  const [allPosts, setAllPosts] = useState();
  const [shortPosts, setShortPosts] = useState();
  const [userAccounts, setUserAccounts] = useState();
  const [amount, setAmount] = useState(0);
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
        shortPosts,
        setShortPosts,
        userAccounts,
        setUserAccounts,
        amount, setAmount
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export { HomeContext };
