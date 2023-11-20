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
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let draft = await axiosPrivate.get(process.env.REACT_APP_VIEW_DRAFT);
        setDraft(draft?.data);
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

  const removeDraft = async (postId) => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_DELETE_DRAFT,
        {
          postId: postId,
        }
      );
      if (response?.status === 200) {
        toast.success("Xóa bài nháp thành công");
        let newDraft = draft?.DraftList.filter(
          (item) => item?.postId !== postId
        );
        setDraft((prevDraft) => ({
          ...prevDraft,
          DraftList: newDraft,
        }));
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  const removePost = async (postId) => {
    try {
      let response = await axiosPrivate.post(
        process.env.REACT_APP_DELETE_POST,
        {
          postId: postId,
        }
      );
      if (response?.status === 200) {
        toast.success("Xóa bài viết thành công");
        let newPost = draft?.DeclinePostList.filter(
          (item) => item?.postId !== postId
        );
        setDraft((prevDraft) => ({
          ...prevDraft,
          DeclinePostList: newPost,
        }));
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

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
  return (
    <Draft
      draft={sortedDraft}
      declined={sortedDeclined}
      removeDraft={removeDraft}
      removePost={removePost}
    />
  );
}
