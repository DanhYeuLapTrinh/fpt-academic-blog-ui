import React, { useCallback, useEffect, useState } from "react";
import SearchPopper from "./SearchPopper";
import usePostTag from "../../../hooks/usePostTag";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useHome from "../../../hooks/useHome";
import { toast } from "react-toastify";

export default function SearchPopperService() {
  const [inputTitle, setInputTitle] = useState(null);
  const [inputContent, setInputContent] = useState([]);
  const { setSearchPost, categoryList } =
    useHome();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };


  const handleSearch = async () => {
    try {
      if (inputTitle === null && inputContent.length === 0) {
        toast.error("Vui lòng nhập tiêu đề hoặc chủ đề để tìm kiếm");
        return;
      }
      let response = await axiosPrivate.post(
        process.env.REACT_APP_FILTER_POSTS_HOME,
        {
          title: inputTitle,
          listTagsAndCategories: inputContent,
        }
      );
      setSearchPost(response?.data);
      setOpen(false);
      navigate("/filter");
    } catch (error) {}
  };
  return (
    <SearchPopper
      categoryList={categoryList}
      inputContent={inputContent}
      inputTitle={inputTitle}
      setInputTitle={setInputTitle}
      setInputContent={setInputContent}
      handleSearch={handleSearch}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      open={open}
    />
  );
}
