import React, { useEffect } from "react";
import Filter from "./Filter";
import useHome from "../../../hooks/useHome";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function FilterService() {
  const { searchPost, setSearchPost, accountName, setAccountName } = useHome();
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let s = searchParams.get("s") || null;
  let c = searchParams.get("c")?.split("-") || [];
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_FILTER_POSTS_HOME,
          {
            title: s,
            listTagsAndCategories: c,
          }
        );
        setSearchPost([...response?.data?.postList, ...response?.data?.qaList]);
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
  return <Filter accountName={accountName} setAccountName={setAccountName} />;
}
