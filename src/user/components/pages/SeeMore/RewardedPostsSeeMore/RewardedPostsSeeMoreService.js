import React, { useEffect } from "react";
import RewardedPostsSeeMore from "./RewardedPostsSeeMore";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useHome from "../../../../hooks/useHome";
import { sortByPropertyName } from "../../../../utils/StringMethod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RewardedPostsSeeMoreService() {
  const axiosPrivate = useAxiosPrivate();
  const { rewardedPosts, setRewardedPosts } = useHome();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);
        let rewardedPosts = await axiosPrivate.get(
          process.env.REACT_APP_REWARDED_POSTS
        );
        setRewardedPosts(rewardedPosts?.data);
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

  return <RewardedPostsSeeMore data={rewardedPosts} />;
}
