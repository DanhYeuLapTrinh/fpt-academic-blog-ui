import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ViewPendingPost from "./ViewPendingPost";
import useError from "../../../../hooks/useError";

export default function ViewPendingPostService() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const [open, setOpen] = useState();
  const [isRewaded, setIsRewarded] = useState();
  const { errorMsg } = useError();

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  const handleGiveReward = (e) => {
    setIsRewarded(e.target.checked);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
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
      await axiosPrivate.post(process.env.REACT_APP_APPROVE_POST, {
        postId: data?.postId,
      });
      window.scrollTo(0, 0);
      navigate("/pending-posts", { replace: true });
      if (isRewaded) {
        await axiosPrivate.post(process.env.REACT_APP_GIVE_REWARD, {
          postId: data?.postId,
        });
      }
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
      navigate("/pending-posts", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ViewPendingPost
      data={data}
      open={open}
      handleDecline={handleDecline}
      handleSubmit={handleSubmit}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      handleGiveReward={handleGiveReward}
    />
  );
}
