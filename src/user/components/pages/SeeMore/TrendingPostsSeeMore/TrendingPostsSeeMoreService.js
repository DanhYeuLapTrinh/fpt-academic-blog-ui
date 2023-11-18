import React, { useEffect } from "react";
import TrendingPostsSeeMore from "./TrendingPostsSeeMore";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useHome from "../../../../hooks/useHome";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TrendingPostsSeeMoreService() {
  const axiosPrivate = useAxiosPrivate();
  const { trendingPosts, setTrendingPosts } = useHome();
  const navigate = useNavigate()
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let trendingPosts = await axiosPrivate.get(
          process.env.REACT_APP_TRENDING_POSTS
        );
        setTrendingPosts(trendingPosts?.data);
      } catch (error) {if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }}
    };
    fetchData();
  }, []);
  return <TrendingPostsSeeMore data={trendingPosts} />;
}
