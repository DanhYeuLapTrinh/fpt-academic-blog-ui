import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useHome from "../../../hooks/useHome";
import Categories from "./Categories";

export default function CategoriesService() {
  const [searchParams] = useSearchParams();
  let name = searchParams.get("name");
  let id = searchParams.get("id");
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const { amount, setAmount } = useHome();
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
        setAmount(response?.data?.length);
      } catch (error) {}
    };
    fetchData();
  }, [id]);
  return <Categories name={name} id={id} data={data} amount={amount} />;
}
