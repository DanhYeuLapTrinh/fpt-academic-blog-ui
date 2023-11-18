import React, { useEffect, useState } from "react";
import ViewPendingQuestion from "./ViewPendingQuestion";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

export default function ViewPendingQuestionService() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_A_POST,
          {
            slug: slug,
          }
        );
        setData(response.data);
      };
      fetchData();
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  }, []);

  const handleSubmit = async () => {
    try {
      await axiosPrivate.post(process.env.REACT_APP_APPROVE_QA, {
        postId: data?.postId,
      });
      window.scrollTo(0, 0);
      navigate("/pending-questions", { replace: true });
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  const handleDecline = async () => {
    try {
      await axiosPrivate.post(process.env.REACT_APP_DECLINE_QA, {
        postId: data?.postId,
      });
      window.scrollTo(0, 0);
      navigate("/pending-questions", { replace: true });
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
    }
  };

  return (
    <ViewPendingQuestion
      data={data}
      handleSubmit={handleSubmit}
      handleDecline={handleDecline}
    />
  );
}
