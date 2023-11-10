import React, { createContext, useState } from "react";
const ProfileContext = createContext();
export default function ProfileProvider({ children }) {
  const [selected, setSelected] = useState("Bài viết");
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [avatarURL, setAvatarURL] = useState(null);
  const [profileCoverURL, setProfileCoverURL] = useState("");
  return (
    <ProfileContext.Provider
      value={{
        selected,
        setSelected,
        followingList,
        setFollowingList,
        followerList,
        setFollowerList,
        avatarURL,
        setAvatarURL,
        profileCoverURL,
        setProfileCoverURL,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
export { ProfileContext };
