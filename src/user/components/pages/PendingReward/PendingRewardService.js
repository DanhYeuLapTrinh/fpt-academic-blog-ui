import React, { useEffect, useState } from "react";
import PendingReward from "./PendingReward";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

export default function PendingRewardService() {
  const axiosPrivate = useAxiosPrivate();
  const [pendingReward, setPendingReward] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axiosPrivate.get(
          process.env.REACT_APP_PENDING_REWARD
        );
        setPendingReward(response.data);
      } catch (error) {
        toast.error("Có lỗi trong quá trình xử lý");
      }
    };
    fetchData();
  }, []);
  return <PendingReward pendingReward={pendingReward}/>;
}
