import React, { createContext, useState } from "react";
const PostContext = createContext();
export default function PostProvider({ children }) {
  const [postDetail, setPostDetail] = useState();
  const [historyDetail, setHistoryDetail] = useState();
  const [activeComment, setActiveComment] = useState(null);
  const [tagName, setTagName] = useState(null);
  const [voteList, setVoteList] = useState([]);
  const [reportReasons, setReportReasons] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isAllowComment, setIsAllowComment] = useState(true);
  return (
    <PostContext.Provider
      value={{
        postDetail,
        setPostDetail,
        activeComment,
        setActiveComment,
        tagName,
        setTagName,
        voteList,
        setVoteList,
        reportReasons,
        setReportReasons,
        isAuthor,
        setIsAuthor,
        historyDetail,
        setHistoryDetail,
        isAllowComment,
        setIsAllowComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export { PostContext };
