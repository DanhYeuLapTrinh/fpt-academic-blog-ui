import React, { useEffect, useState } from "react";
import ViewProfile from "./ViewProfile";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { sortByPropertyName } from "../../../utils/StringMethod";
import useAuth from "../../../hooks/useAuth";
import useProfile from "../../../hooks/useProfile";

export default function ViewProfileService() {
  const { id } = useParams();
  const profileID = Number(id);
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState({});
  const {followerList, setFollowerList} = useProfile()
  const auth = useAuth()
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let profileInfo = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_PROFILE,
          {
            userId: profileID,
          }
        );
        setUser(profileInfo?.data);
        let followersList = await axiosPrivate.post(process.env.REACT_APP_VIEW_FOLLOWERS, {
          userId: profileID,
        })
        setFollowerList(followersList?.data)
        console.log(followerList)
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  const sort = sortByPropertyName(user?.postList, "", "postId");

  const followAccount = async () => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_FOLLOW_ACCOUNT,
        {
          followedBy: auth?.id,
          userId: id,
        }
      );
    } catch (error) {}
  };
  return (
    <ViewProfile
      url={user?.coverURL}
      height="218px"
      avatarURL={user?.profileUrl}
      accountName={user?.fullname}
      numOfPost={user?.numOfPost}
      numOfFollower={user?.numOfFollower}
      userStory={user?.userStory}
      postList={sort}
      userId={user?.userId}
      slug={id}
      followAccount={followAccount}
    />
  );
}
