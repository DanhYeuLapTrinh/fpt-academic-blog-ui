import { createContext, useContext, useEffect, useState } from "react";

const NewsContext = createContext();

export const useNewsContext = () => {
  return useContext(NewsContext);
};

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState(
    JSON.parse(localStorage.getItem("news")) || {}
  );

  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(news));
  }, [news]);

  return (
    <NewsContext.Provider value={{ news, setNews }}>
      {children}
    </NewsContext.Provider>
  );
};
