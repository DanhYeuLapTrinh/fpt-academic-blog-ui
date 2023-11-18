import React, { useEffect } from "react";
import ProfileFollowerList from "./ProfileFollowerList";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useProfile from "../../../../hooks/useProfile";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProfileFollowerListService(props) {
  const { followerList, setFollowerList } = useProfile();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        let followersList = await axiosPrivate.post(
          process.env.REACT_APP_VIEW_FOLLOWERS,
          {
            userId: id,
          }
        );
        setFollowerList(followersList?.data);
      } catch (error) {
        if(error?.response?.status === 405){
          toast.error("Tài khoản của bạn đã bị khóa")
          navigate("/login", { replace: true });
          localStorage.removeItem("auth")
        }
      }
    };
    fetchData();
  }, [id]);

  
  return <ProfileFollowerList followerList={followerList} />;
}
