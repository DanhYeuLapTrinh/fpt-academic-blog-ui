import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ViewPendingPost from "./ViewPendingPost";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";

export default function ViewPendingPostService() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const [oldLink, setOldLink] = useState(null);
  const [open, setOpen] = useState();
  const [isRewarded, setIsRewarded] = useState("Trao thưởng");
  const [hasGiveReward, setHasGiveReward] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
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
      if (isRewarded === "Đã trao thưởng") {
        await axiosPrivate.post(process.env.REACT_APP_GIVE_REWARD, {
          postId: data?.postId,
        });
      }
      if (data?.reasonOfDecline) {
        await axiosPrivate.post(process.env.REACT_APP_DELETE_NOTIFICATION, {
          content: `bị từ chối`,
          relatedId: data?.postId,
          type: "post",
          userId: data?.userId,
        });
      }
      await axiosPrivate.post(process.env.REACT_APP_SEND_NOTIFICATION, {
        content: `Bài viết của bạn đã được duyệt: ${data?.title}`,
        relatedId: data?.postId,
        type: "post",
        userId: data?.userId,
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

  const handleDecline = async (reason) => {
    try {
      await axiosPrivate.post(process.env.REACT_APP_DECLINE_POST, {
        postId: data?.postId,
        reasonOfDecline: reason,
      });
      await axiosPrivate.post(process.env.REACT_APP_SEND_NOTIFICATION, {
        content: `Bài viết của bạn đã bị từ chối: ${data?.title}`,
        relatedId: data?.postId,
        type: "post",
        userId: data?.userId,
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
  let found = data?.rewarder?.find((item) => item?.userId === auth?.id);
  useEffect(() => {
    found = found === undefined ? false : true;
    if (found) {
      setHasGiveReward(true);
    }
  }, [data?.postId]);

  return (
    <ViewPendingPost
      data={data}
      open={open}
      handleDecline={handleDecline}
      handleSubmit={handleSubmit}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      setIsRewarded={setIsRewarded}
      isRewarded={isRewarded}
      oldLink={oldLink}
      hasGiveReward={hasGiveReward}
      setHasGiveReward={setHasGiveReward}
    />
  );
}
