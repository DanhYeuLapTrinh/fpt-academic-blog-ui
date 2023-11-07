import { createContext, useContext, useState } from "react";

const NewsContext = createContext();

export const useNewsContext = () => {
  return useContext(NewsContext);
};

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  return (
    <NewsContext.Provider value={{ news, setNews }}>
      {children}
    </NewsContext.Provider>
  );
};
