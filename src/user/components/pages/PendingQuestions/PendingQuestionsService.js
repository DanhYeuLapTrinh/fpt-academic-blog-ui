import React, { useEffect, useState } from "react";
import PendingQuestions from "./PendingQuestions";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useManagePost from "../../../hooks/useManagePost";
import { sortByPropertyName } from "../../../utils/StringMethod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PendingQuestionsService() {
  const { sort, pendingQ, setPendingQ, setQAmount } = useManagePost();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  let sortedPending = pendingQ?.sort(
    (a, b) =>
      new Date(b.dateOfPost).getTime() - new Date(a.dateOfPost).getTime()
  );
  if (sort !== "Mới nhất") {
    sortedPending = pendingQ?.sort(
      (a, b) =>
        new Date(a.dateOfPost).getTime() - new Date(b.dateOfPost).getTime()
    );
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
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        }
      }
    };
    fetchData();
  }, []);
  return <PendingQuestions questions={sortedPending} />;
}
