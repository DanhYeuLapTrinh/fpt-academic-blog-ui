import React, { useEffect } from "react";
import ApprovedQuestions from "./ApprovedQuestions";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useManagePost from "../../../hooks/useManagePost";
import { sortByPropertyName } from "../../../utils/StringMethod";

export default function ApprovedQuestionsService() {
  const axiosPrivate = useAxiosPrivate();
  const { approvedQ, setApprovedQ,setQApprovedAmount,sort } = useManagePost();
  let sortedQA = sortByPropertyName(approvedQ, "", "postId");
  if (sort !== "Mới nhất") {
    sortedQA = sortByPropertyName(approvedQ, "asc", "postId");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get(
          process.env.REACT_APP_APPROVED_QUESTIONS
        );
        setApprovedQ(response?.data)
        setQApprovedAmount(response?.data?.length)
      } catch (error) {}
    };
    fetchData()
  }, []);
  return <ApprovedQuestions approvedQ={sortedQA}/>;
}
