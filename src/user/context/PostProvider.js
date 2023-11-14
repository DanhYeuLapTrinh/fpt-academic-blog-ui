import React, { createContext, useState } from "react";
const PostContext = createContext();
export default function PostProvider({ children }) {
  const [postDetail, setPostDetail] = useState();
  const [activeComment, setActiveComment] = useState(null);
  const [tagName, setTagName] = useState(null);
  const [voteList, setVoteList] = useState([]);
  const [reportReasons, setReportReasons] = useState([]);
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export { PostContext };
