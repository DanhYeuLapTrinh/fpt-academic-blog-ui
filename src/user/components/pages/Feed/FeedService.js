import React, { useEffect, useState } from "react";
import Feed from "./Feed";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function FeedService() {
  const axiosPrivate = useAxiosPrivate();
  const [feed, setFeed] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let feed = await axiosPrivate.get(process.env.REACT_APP_FEEDS_LIST);
        setFeed(feed?.data);
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    fetchData();
  }, []);
  return <Feed data={feed} />;
}
