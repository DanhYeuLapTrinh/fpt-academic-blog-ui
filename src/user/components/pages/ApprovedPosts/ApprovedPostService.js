import React, { useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useManagePost from "../../../hooks/useManagePost";
import useHome from "../../../hooks/useHome";
import { sortByPropertyName } from "../../../utils/StringMethod";
import ApprovedPost from "./ApprovedPost";

export default function ApprovedPostService() {
  const axiosPrivate = useAxiosPrivate();
  const {
    approvedPosts,
    setApprovedPosts,
    sort,
    setSort,
    approvedAmount,
    setApprovedAmount,
    isRewarded,
    setIsRewarded,
  } = useManagePost();
  const { isLoading, setIsLoading } = useHome();
  let sortedApprove = sortByPropertyName(approvedPosts, "", "postId");
  if (sort !== "Mới nhất") {
    sortedApprove = sortByPropertyName(approvedPosts, "asc", "postId");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          process.env.REACT_APP_APPROVED_POSTS
        );
        setApprovedPosts(response?.data);
        setApprovedAmount(response?.data?.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);
  return (
    <ApprovedPost
      approvedPosts={sortedApprove}
      sort={sort}
      setSort={setSort}
      approvedAmount={approvedAmount}
      setIsRewarded={setIsRewarded}
    />
  );
}
