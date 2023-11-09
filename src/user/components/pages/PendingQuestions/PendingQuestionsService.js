import React, { useEffect, useState } from "react";
import PendingQuestions from "./PendingQuestions";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useManagePost from "../../../hooks/useManagePost";
import { sortByPropertyName } from "../../../utils/StringMethod";

export default function PendingQuestionsService() {
  const { sort, pendingQ, setPendingQ, setQAmount } = useManagePost();

  const axiosPrivate = useAxiosPrivate();
  let sortedPending = sortByPropertyName(pendingQ, "", "postId");
  if (sort !== "Mới nhất") {
    sortedPending = sortByPropertyName(pendingQ, "asc", "postId");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get(
          process.env.REACT_APP_PENDING_QUESTIONS
        );
        setPendingQ(response?.data);
        setQAmount(response?.data?.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <PendingQuestions questions={sortedPending} />;
}
