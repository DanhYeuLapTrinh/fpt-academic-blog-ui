import React, { useEffect, useState } from "react";
import ViewNews from "./ViewNews";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function ViewNewsService() {
  const [news, setNews] = useState();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let news = await axiosPrivate.get(
          process.env.REACT_APP_VIEW_NEW + id
        );
        setNews(news?.data);
        console.log(news?.data)
      } catch (error) {}
    };
    fetchData();
  }, [])
  return <ViewNews />;
}
