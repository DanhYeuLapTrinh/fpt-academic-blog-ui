import React, { useEffect, useState } from "react";
import ViewPendingQuestion from "./ViewPendingQuestion";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

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
      console.log(error);
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
      console.log(error);
    }
  };

  const handleDecline = async (reason) => {
    try {
      await axiosPrivate.post(process.env.REACT_APP_DECLINE_POST, {
        postId: data?.postId,
        reasonOfDecline: reason,
      });
      window.scrollTo(0, 0);
      navigate("/approved-posts", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  
  return <ViewPendingQuestion data={data} handleSubmit={handleSubmit} />;
}
