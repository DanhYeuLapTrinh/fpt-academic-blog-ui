import React, { createContext, useState } from "react";
const PostContext = createContext();
export default function PostProvider({ children }) {
  const [postDetail, setPostDetail] = useState();
  const [activeComment, setActiveComment] = useState(null);
  const [tagName, setTagName] = useState(null);
  return (
    <PostContext.Provider
      value={{
        postDetail,
        setPostDetail,
        activeComment,
        setActiveComment,
        tagName,
        setTagName,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export { PostContext };
