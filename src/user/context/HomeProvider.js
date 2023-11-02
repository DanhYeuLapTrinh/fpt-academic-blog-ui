import React, { createContext, useState } from "react";
const HomeContext = createContext();
export default function HomeProvider({ children }) {
  const [trendingPosts, setTrendingPosts] = useState();
  return (
    <HomeContext.Provider value={{ trendingPosts, setTrendingPosts }}>
      {children}
    </HomeContext.Provider>
  );
}

export {HomeContext}
