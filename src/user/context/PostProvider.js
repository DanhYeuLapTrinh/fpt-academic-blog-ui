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
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFavored, setIsFavored] = useState(false);
  const [upvote, setUpVote] = useState(0);
  const [downvote, setDownVote] = useState(0);
  // check xem vote gì trước up down ""
  const [select, setSelect] = useState("");
  // check xem đã vote chưa true false
  const [voted, setVoted] = useState();
  const [inputTitle, setInputTitle] = useState(null);
  const [inputContent, setInputContent] = useState([]);
  const [inputKeywords, setInputKeywords] = useState([]);
  const [hasPermission, setHasPermisson] = useState(false);
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
        isFollowing,
        setIsFollowing,
        isFavored,
        setIsFavored,
        upvote,
        setUpVote,
        downvote,
        setDownVote,
        select,
        setSelect,
        voted,
        setVoted,
        inputTitle,
        setInputTitle,
        inputContent,
        setInputContent,
        inputKeywords,
        setInputKeywords,
        hasPermission,
        setHasPermisson,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export { PostContext };
