import React, { useEffect, useState } from "react";
import Draft from "./Draft";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { sortByPropertyName } from "../../../utils/StringMethod";
import useManagePost from "../../../hooks/useManagePost";

export default function DraftService() {
  const axiosPrivate = useAxiosPrivate();
  const [draft, setDraft] = useState();
  const { sort, setSort } = useManagePost();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let draft = await axiosPrivate.get(process.env.REACT_APP_VIEW_DRAFT);
        setDraft(draft?.data);
      } catch (error) {
        console.log(error);
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
