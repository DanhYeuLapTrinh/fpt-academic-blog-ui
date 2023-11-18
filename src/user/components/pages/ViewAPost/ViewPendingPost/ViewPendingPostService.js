import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ViewPendingPost from "./ViewPendingPost";
import { toast } from "react-toastify";

export default function ViewPendingPostService() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const [oldLink, setOldLink] = useState(null);
  const [open, setOpen] = useState();
  const [isRewaded, setIsRewarded] = useState();

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
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_A_POST,
          {
            slug: slug,
          }
        );
        setData(response?.data);
        if (response?.data?.originSlug) {
          const origin = await axiosPrivate.post(
            process.env.REACT_APP_VIEW_A_POST,
            {
              slug: response.data.originSlug,
            }
          );
          setOldLink(origin.data);
        }
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
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
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
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }
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
      oldLink={oldLink}
    />
  );
}
