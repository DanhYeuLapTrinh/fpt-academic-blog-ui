import React, { useEffect } from "react";
import ApprovedQuestions from "./ApprovedQuestions";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useManagePost from "../../../hooks/useManagePost";

export default function ApprovedQuestionsService() {
  const axiosPrivate = useAxiosPrivate();
  const { approvedQ, setApprovedQ,setQApprovedAmount } = useManagePost();
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
  return <ApprovedQuestions approvedQ={approvedQ}/>;
}
