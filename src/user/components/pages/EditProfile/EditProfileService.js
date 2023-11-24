import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import useProfile from "../../../hooks/useProfile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditProfileService() {
  const { myUser, setMyUser } = useProfile();
  const [updatedName, setUpdatedName] = useState();
  const [updatedEmail, setUpdatedEmail] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let userInfo = await axiosPrivate.get(
          process.env.REACT_APP_GET_USER_INFORMATION
        );
        setMyUser(userInfo?.data);
        setUpdatedName(userInfo?.data?.fullName);
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
  return <EditProfile profile={myUser} updatedName={updatedName} />;
}
