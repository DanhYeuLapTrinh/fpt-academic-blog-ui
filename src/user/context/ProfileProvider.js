import React, { createContext, useState } from "react";
const ProfileContext = createContext();
export default function ProfileProvider({ children }) {
  const [selected, setSelected] = useState("Bài viết");
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  return (
    <ProfileContext.Provider
      value={{
        selected,
        setSelected,
        followingList,
        setFollowingList,
        followerList,
        setFollowerList,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
export { ProfileContext };
