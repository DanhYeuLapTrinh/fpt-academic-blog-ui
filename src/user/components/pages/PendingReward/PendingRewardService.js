import React, { useEffect, useState } from "react";
import PendingReward from "./PendingReward";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PendingRewardService() {
  const axiosPrivate = useAxiosPrivate();
  const [pendingReward, setPendingReward] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get(
          process.env.REACT_APP_PENDING_REWARD
        );
        setPendingReward(response.data);
      } catch (error) {
        if (error?.response?.status === 405) {
          toast.error("Tài khoản của bạn đã bị khóa");
          navigate("/login", { replace: true });
          localStorage.removeItem("auth");
        } else {
          toast.error("Có lỗi trong quá trình xử lý");
        }
      }
    };
    fetchData();
  }, []);
  return <PendingReward pendingReward={pendingReward} />;
}
