import React, { useEffect, useState } from "react";
import Topic from "./Categories";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useHome from "../../../hooks/useHome";

export default function CategoriesService() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const {amount, setAmount} = useHome();
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_FILTER_POSTS,
          {
            categoryId: Number(id),
          }
        );
        setData(response?.data);
        setAmount(response?.data?.length)
      } catch (error) {}
    };
    fetchData();
  }, [id]);
  return <Topic data={data} amount={amount}/>;
}
