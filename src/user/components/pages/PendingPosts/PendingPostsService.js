import React, { useEffect, useState } from "react";
import PendingPosts from "./PendingPosts";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { sortByPropertyName } from "../../../utils/StringMethod";

export default function PendingPostsService() {
  const axiosPrivate = useAxiosPrivate();
  const [pendingPosts, setPendingPosts] = useState();
  const [type, setType] = useState("Bài viết đang chờ");
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("Mới nhất");
  const [amount, setAmount] = useState(0)
  let sorted = sortByPropertyName(pendingPosts, "", "postId");
  if (sort !== "Mới nhất") {
    sorted = sortByPropertyName(pendingPosts, "asc", "postId");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(
          process.env.REACT_APP_PENDING_POSTS
        );
        setPendingPosts(response?.data);
        setAmount(response?.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);
  return (
    <PendingPosts
      pendingPosts={sorted}
      setType={setType}
      type={type}
      isLoading={isLoading}
      sort={sort}
      setSort={setSort}
      amount={amount}
    />
  );
}
