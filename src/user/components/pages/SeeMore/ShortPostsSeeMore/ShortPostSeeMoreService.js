import React, { useEffect } from "react";
import ShortPostSeeMore from "./ShortPostSeeMore";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useHome from "../../../../hooks/useHome";
import { sortByPropertyName } from "../../../../utils/StringMethod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ShortPostSeeMoreService() {
  const { shortPosts, setShortPosts } = useHome();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let shortPosts = await axiosPrivate.get(
          process.env.REACT_APP_SHORT_POSTS
        );
        setShortPosts(shortPosts?.data);
      } catch (error) {if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }}
    };
    fetchData();
  }, []);
  let sortedShortPosts = sortByPropertyName(shortPosts, "", "postId");
  return <ShortPostSeeMore data={sortedShortPosts}/>;
}
