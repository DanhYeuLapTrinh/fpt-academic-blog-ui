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
    setIsRewarded,
  } = useManagePost();
  const { isLoading, setIsLoading } = useHome();
  let sortedApprove = approvedPosts?.sort(
    (a, b) =>
      new Date(b.dateOfPost).getTime() - new Date(a.dateOfPost).getTime()
  );
  if (sort !== "Mới nhất") {
    sortedApprove = approvedPosts?.sort(
      (a, b) =>
        new Date(a.dateOfPost).getTime() - new Date(b.dateOfPost).getTime()
    );
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let response = await axiosPrivate.get(
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
