import React, { useEffect } from "react";
import LatestPostsSeeMore from "./LatestPostsSeeMore";
import useHome from "../../../../hooks/useHome";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LatestPostsSeeMoreService() {
  const { latestPosts, setLatestPosts } = useHome();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let latestPosts = await axiosPrivate.get(
          process.env.REACT_APP_LATEST_POSTS
        );
        setLatestPosts(latestPosts?.data);
      } catch (error) {if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }}
    };
    fetchData();
  }, []);
  return <LatestPostsSeeMore data={latestPosts} />;
}