import React, { useEffect, useState } from "react";
import Draft from "./Draft";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { sortByPropertyName } from "../../../utils/StringMethod";
import useManagePost from "../../../hooks/useManagePost";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DraftService() {
  const axiosPrivate = useAxiosPrivate();
  const [draft, setDraft] = useState();
  const { sort, setSort } = useManagePost();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let draft = await axiosPrivate.get(process.env.REACT_APP_VIEW_DRAFT);
        setDraft(draft?.data);
      } catch (error) {
        if(error.response.status === 405){
          toast.error("Tài khoản của bạn đã bị khóa")
          navigate("/login", { replace: true });
          localStorage.removeItem("auth")
        }
      }
    };
    fetchData();
  }, []);

  let sortedDraft = sortByPropertyName(draft?.DraftList, "", "postId");
  if (sort !== "Mới nhất") {
    sortedDraft = sortByPropertyName(draft?.DraftList, "asc", "postId");
  }

  let sortedDeclined = sortByPropertyName(draft?.DeclinePostList, "", "postId");
  if (sort !== "Mới nhất") {
    sortedDeclined = sortByPropertyName(
      draft?.DeclinePostList,
      "asc",
      "postId"
    );
  }
  return <Draft draft={sortedDraft} declined={sortedDeclined} />;
}
