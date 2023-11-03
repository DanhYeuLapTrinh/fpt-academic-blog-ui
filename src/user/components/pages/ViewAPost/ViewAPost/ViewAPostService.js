import React, { useEffect, useState } from "react";
import ViewAPost from "./ViewAPost";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export default function ViewAPostService() {
  const { slug } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_A_POST,
          {
            slug: slug,
          }
        );
        setData(response.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return <ViewAPost data={data}/>;
}
