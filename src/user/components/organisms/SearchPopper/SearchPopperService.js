import React, { useEffect, useState } from "react";
import SearchPopper from "./SearchPopper";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useHome from "../../../hooks/useHome";
import { toast } from "react-toastify";
import useHomeAPI from "../../pages/Home";
import usePost from "../../../hooks/usePost";

export default function SearchPopperService() {
  const {
    inputTitle,
    setInputTitle,
    inputContent,
    setInputContent,
    inputKeywords,
    setInputKeywords,
  } = usePost();
  const {
    setSearchPost,
    categoryList,
    setCategoryList,
    setKeywords,
    keywords,
  } = useHome();
  const { getCategories, getKeywords } = useHomeAPI();
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
        const keywords = await getKeywords();
        setKeywords(keywords);
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

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleSearch = async () => {
    try {
      if (
        inputTitle === null &&
        inputContent.length === 0 &&
        inputKeywords.length === 0
      ) {
        toast.error("Vui lòng nhập ít nhất một nội dung để tìm kiếm");
        return;
      }
      let newKeywords = inputKeywords?.map((keyword) => keyword?.skillName);
      let url = [];
      if (inputTitle !== null) {
        url.push(`s=${inputTitle}`);
      }
      if (inputContent.length) {
        url.push(`c=${inputContent.join("-")}`);
      }
      if (inputKeywords.length) {
        url.push(`k=${newKeywords.join("-")}`);
      }
      let urlParams = url.join("&");
      navigate(`/filter?${urlParams}`);
      setOpen(false);
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
      keywords={keywords}
      inputContent={inputContent}
      inputTitle={inputTitle}
      setInputTitle={setInputTitle}
      setInputContent={setInputContent}
      setInputKeywords={setInputKeywords}
      handleSearch={handleSearch}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      open={open}
    />
  );
}
