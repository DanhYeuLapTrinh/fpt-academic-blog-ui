import React, { useEffect, useState } from "react";
import ViewNews from "./ViewNews";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

export default function ViewNewsService() {
  const [news, setNews] = useState();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let news = await axiosPrivate.get(
          process.env.REACT_APP_VIEW_NEW + id
        );
        setNews(news?.data);
      } catch (error) {if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }}
    };
    fetchData();
  }, [])
  return <ViewNews news={news}/>;
}
