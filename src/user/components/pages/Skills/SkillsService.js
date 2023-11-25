import React, { useEffect, useState } from "react";
import Skills from "./Skills";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function SkillsService() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_FILTER_KEYWORDS,
          {
            skill: id === "c-sharp" ? "c#" : id,
          }
        );
        setData(response?.data);
      } catch (error) {}
    };
    fetchData();
  }, [id]);
  return <Skills id={id} data={data} />;
}
