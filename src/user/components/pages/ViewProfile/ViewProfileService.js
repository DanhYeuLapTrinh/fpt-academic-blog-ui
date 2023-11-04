import React, { useEffect, useState } from "react";
import ViewProfile from "./ViewProfile";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function ViewProfileService() {
  const { id } = useParams();
  const profileID = Number(id);
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState({});
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_PROFILE,
          {
            userId: profileID,
          }
        );
        if (response?.status === 200) {
          setUser(response?.data);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <ViewProfile
      url={user?.coverURL}
      height="218px"
      avatarURL={user?.profileUrl}
      accountName={user?.fullname}
    />
  );
}
