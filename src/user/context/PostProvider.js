import React, { createContext, useState } from "react";
const PostContext = createContext();
export default function PostProvider({ children }) {
  const [postDetail, setPostDetail] = useState();
  const [historyDetail, setHistoryDetail] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [tagName, setTagName] = useState(null);
  const [voteList, setVoteList] = useState([]);
  const [reportReasons, setReportReasons] = useState([]);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isAllowComment, setIsAllowComment] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavored, setIsFavored] = useState(false);
  const [vote, setVote] = useState(0);
  // check xem vote gì trước up down ""
  const [select, setSelect] = useState("");
  // check xem đã vote chưa true false
  const [voted, setVoted] = useState();
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
        isFollowing,
        setIsFollowing,
        isFavored,
        setIsFavored,
        vote,
        setVote,
        select,
        setSelect,
        voted,
        setVoted,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export { PostContext };
