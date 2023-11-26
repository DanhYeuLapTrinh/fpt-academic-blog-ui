import React, { useEffect } from "react";
import ApprovedQuestions from "./ApprovedQuestions";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useManagePost from "../../../hooks/useManagePost";
import { sortByPropertyName } from "../../../utils/StringMethod";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ApprovedQuestionsService() {
  const axiosPrivate = useAxiosPrivate();
  const { approvedQ, setApprovedQ, setQApprovedAmount, sort } = useManagePost();
  const navigate = useNavigate();
  let sortedQA = approvedQ?.sort(
    (a, b) =>
      new Date(b.dateOfPost).getTime() - new Date(a.dateOfPost).getTime()
  );
  if (sort !== "Mới nhất") {
    sortedQA = approvedQ?.sort(
      (a, b) =>
        new Date(a.dateOfPost).getTime() - new Date(b.dateOfPost).getTime()
    );
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get(
          process.env.REACT_APP_APPROVED_QUESTIONS
        );
        setApprovedQ(response?.data);
        setQApprovedAmount(response?.data?.length);
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
  return <ApprovedQuestions approvedQ={sortedQA} />;
}
