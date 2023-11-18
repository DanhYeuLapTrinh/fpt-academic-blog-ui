import React, { useEffect, useState } from "react";
import ViewPendingReward from "./ViewPendingReward";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ViewPendingRewardService() {
  const [rewardPost, setRewardPost] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  const { slug } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_A_POST,
          {
            slug: slug,
          }
        );
        setRewardPost(response.data);
      } catch (error) {if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      }}
    };
    fetchData();
  }, []);
  const giveReward = async () => {
    try {
      let response = await axiosPrivate.post(process.env.REACT_APP_GIVE_REWARD, {
        postId: rewardPost?.postId,
      });
      if(response) {
        navigate("/pending-reward", { replace: true });
      }
    } catch (error) {if (error?.response?.status === 405) {
      toast.error("Tài khoản của bạn đã bị khóa");
      navigate("/login", { replace: true });
      localStorage.removeItem("auth");
    }}
  };
  return <ViewPendingReward rewardPost={rewardPost} giveReward={giveReward}/>;
}
