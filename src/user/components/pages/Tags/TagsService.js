import { useNavigate, useSearchParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import useHome from "../../../hooks/useHome";
import Tags from "./Tags";
import { toast } from "react-toastify";

export default function TagsService() {
  const [searchParams] = useSearchParams();
  let name = searchParams.get("name");
  let id = searchParams.get("id");
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const { amount, setAmount } = useHome();
  const navigate = useNavigate()
  window.scrollTo(0, 0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_FILTER_POSTS,
          {
            tagId: Number(id),
          }
        );
        setData(response?.data);
        setAmount(response?.data?.length);
      } catch (error) {if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }}
    };
    fetchData();
  }, [id]);
  return <Tags name={name} id={id} data={data} amount={amount} />;
}
