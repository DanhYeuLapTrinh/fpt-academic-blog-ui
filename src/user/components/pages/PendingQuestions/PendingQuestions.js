import { Container } from "@mui/material";
import React from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import QAListService from "../../templates/QAList/QAListService";
import QA from "../../organisms/QA/QA";

export default function PendingQuestions() {
  const axiosPrivate = useAxiosPrivate();
  const handleClick = async () => {
    try {
      const response = await axiosPrivate.get("mentor/q-a/view");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <button onClick={handleClick}>Click to fetchData</button>
      <QA pending/>
    </Container>
  );
}
