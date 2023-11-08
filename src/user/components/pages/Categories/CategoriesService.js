import React, { useEffect } from "react";
import Topic from "./Categories";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function CategoriesService() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(process.env.REACT_APP_FILTER_POSTS, {
          categoryId: Number(id),
        });
        console.log(response?.data)
      } catch (error) {}
    };
    fetchData()
  }, [id]);
  return <Topic />;
}
