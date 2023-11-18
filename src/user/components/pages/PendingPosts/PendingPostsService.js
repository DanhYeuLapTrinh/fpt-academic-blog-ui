import React, { useEffect, useState } from "react";
import PendingPosts from "./PendingPosts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { sortByPropertyName } from "../../../utils/StringMethod";
import useHome from "../../../hooks/useHome";
import useManagePost from "../../../hooks/useManagePost";

export default function PendingPostsService() {
  const axiosPrivate = useAxiosPrivate();
  const { pendingPosts, setPendingPosts, sort, setAmount } = useManagePost();
  const { isLoading, setIsLoading } = useHome();
  let sortedPending = pendingPosts?.sort(
    (a, b) =>
      new Date(b.dateOfPost).getTime() - new Date(a.dateOfPost).getTime()
  );
  if (sort !== "Mới nhất") {
    sortedPending = pendingPosts?.sort(
      (a, b) =>
        new Date(a.dateOfPost).getTime() - new Date(b.dateOfPost).getTime()
    );
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          process.env.REACT_APP_PENDING_POSTS
        );
        setPendingPosts(response?.data);
        setAmount(response?.data?.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);
  return <PendingPosts pendingPosts={sortedPending} />;
}
