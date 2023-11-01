import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
export default function ViewPendingPost() {
  const {slug} = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosPrivate.post("users/view-post", {
        slug: slug
      })
      setData(response.data)
    }
    fetchData()
  }, [])
  const d = ""
  console.log(data?.content)
  return <Container>
    <div dangerouslySetInnerHTML={{__html: data?.content}}/>
  </Container>;
}
