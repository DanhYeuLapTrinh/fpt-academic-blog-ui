import React, { useCallback, useEffect, useState } from "react";
import SearchPopper from "./SearchPopper";
import usePostTag from "../../../hooks/usePostTag";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useHome from "../../../hooks/useHome";

export default function SearchPopperService() {
  const [inputTitle, setInputTitle] = useState(null);
  const [inputContent, setInputContent] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const {searchPost, setSearchPost} = useHome()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get(
          process.env.REACT_APP_GET_CATEGORY
        );
        setCategoryList(response?.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      let response = await axiosPrivate.post(process.env.REACT_APP_FILTER_POSTS_HOME, {
        title: inputTitle,
        listTagsAndCategories: inputContent
      })
      setSearchPost(response?.data)
      navigate("/filter")
    } catch (error) {
      
    }
  }
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
