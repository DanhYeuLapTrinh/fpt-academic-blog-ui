import React, { useEffect, useState } from "react";
import ViewProfile from "./ViewProfile";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function ViewProfileService() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get(
          process.env.REACT_APP_VIEW_PROFILE,
          {
            userId: id,
          }
        );
        if(response?.status === 200) {
          setUser(response?.data);
          console.log(response?.data)
        }
      } catch (error) {}
    };
    fetchData();
  }, []);
  return <ViewProfile />;
}
