import React, { createContext, useState } from "react";
const HomeContext = createContext();
export default function HomeProvider({ children }) {
  const [trendingPosts, setTrendingPosts] = useState();
  const [rewardedPosts, setRewardedPosts] = useState();
  const [latestPosts, setLatestPosts] = useState();
  const [allPosts, setAllPosts] = useState();
  const [shortPosts, setShortPosts] = useState();
  const [qaList, setQAList] = useState();
  const [trendingTags, setTrendingTags] = useState();
  const [userAccounts, setUserAccounts] = useState();
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [searchPost, setSearchPost] = useState("");
  const [users, setUsers] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
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
        amount,
        setAmount,
        trendingTags,
        setTrendingTags,
        qaList,
        setQAList,
        accountList,
        setAccountList,
        accountName,
        setAccountName,
        searchPost,
        setSearchPost,
        users,
        setUsers,
        categoryList,
        setCategoryList,
        notifications,
        setNotifications,
        unreadNotifications,
        setUnreadNotifications,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export { HomeContext };
