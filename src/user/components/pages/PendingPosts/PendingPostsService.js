import React, { useEffect, useState } from "react";
import PendingPosts from "./PendingPosts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useManagePost from "../../../hooks/useManagePost";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PendingPostsService() {
  const axiosPrivate = useAxiosPrivate();
  const { pendingPosts, setPendingPosts, sort, setAmount } = useManagePost();
  const navigate = useNavigate();

  const pending = pendingPosts?.PendingPost || [];
  const pendingRewarded = pendingPosts?.PendingRewardedPost || [];

  let combinedArray = [...pending, ...pendingRewarded];

  combinedArray = combinedArray?.sort(
    (a, b) =>
      new Date(b.dateOfPost).getTime() - new Date(a.dateOfPost).getTime()
  );
  
  if (sort !== "Mới nhất") {
    combinedArray = combinedArray?.sort(
      (a, b) =>
        new Date(a.dateOfPost).getTime() - new Date(b.dateOfPost).getTime()
    );
  }
  setAmount(combinedArray?.length);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(
          process.env.REACT_APP_PENDING_POSTS
        );
        setPendingPosts(response?.data);
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
  return <PendingPosts pendingPosts={combinedArray} />;
}
