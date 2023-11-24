import React, { createContext, useState } from "react";
const ProfileContext = createContext();
export default function ProfileProvider({ children }) {
  const [selected, setSelected] = useState("Bài viết");
  const [user, setUser] = useState({});
  const [myUser, setMyUser] = useState({});
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [avatarURL, setAvatarURL] = useState(null);
  const [profileCoverURL, setProfileCoverURL] = useState("");
  return (
    <ProfileContext.Provider
      value={{
        user,
        setUser,
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
        myUser,
        setMyUser,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
export { ProfileContext };
