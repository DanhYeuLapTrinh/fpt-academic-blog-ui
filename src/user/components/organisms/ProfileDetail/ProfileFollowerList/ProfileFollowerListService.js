import React, { useEffect } from "react";
import ProfileFollowerList from "./ProfileFollowerList";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useProfile from "../../../../hooks/useProfile";
import { useParams } from "react-router-dom";

export default function ProfileFollowerListService(props) {
  const { followerList, setFollowerList } = useProfile();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      let followersList = await axiosPrivate.post(
        process.env.REACT_APP_VIEW_FOLLOWERS,
        {
          userId: id,
        }
      );
      setFollowerList(followersList?.data);
    };
    fetchData();
  }, [id]);

  
  return <ProfileFollowerList followerList={followerList} />;
}
