import React, { useEffect, useState } from "react";
import SearchPopper from "./SearchPopper";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useHome from "../../../hooks/useHome";
import { toast } from "react-toastify";
import useHomeAPI from "../../pages/Home";

export default function SearchPopperService() {
  const [inputTitle, setInputTitle] = useState(null);
  const [inputContent, setInputContent] = useState([]);
  const { setSearchPost, categoryList, setCategoryList } = useHome();
  const { getCategories } = useHomeAPI();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        setCategoryList(categories);
      } catch (error) {}
    };
    fetchData();
  }, []);
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
      setSearchPost([...response?.data?.postList, ...response?.data?.qaList]);
      setOpen(false);
      let params = inputContent?.join("-");
      if (inputTitle === null) {
        navigate(`/filter?c=${params}`);
      } else if (inputContent.length === 0) {
        navigate(`/filter?s=${inputTitle}`);
      } else {
        navigate(`/filter?s=${inputTitle}&c=${params}`);
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
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
