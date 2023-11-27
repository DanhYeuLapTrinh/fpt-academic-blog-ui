import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import useProfile from "../../../hooks/useProfile";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../api/axios";

export default function EditProfileService() {
  const { myUser, setMyUser } = useProfile();
  const [updatedName, setUpdatedName] = useState();
  const [updatedEmail, setUpdatedEmail] = useState();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSelected, setIsSelected] = useState("Thông tin hiển thị");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const regex = /^[\w-\.]+@gmail\.com$/;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let userInfo = await axiosPrivate.get(
          process.env.REACT_APP_GET_USER_INFORMATION
        );
        setMyUser(userInfo?.data);
        setUpdatedName(userInfo?.data?.fullName);
        setUpdatedEmail(userInfo?.data?.email);
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

  const changeUserInfo = async () => {
    try {
      if (updatedName === myUser?.fullName) {
        toast.error("Bạn chưa thay đổi thông tin nào");
        return;
      } else if (updatedName.length < 6) {
        toast.error("Tên hiển thị phải có ít nhất 6 ký tự");
        return;
      } else if (updatedName.length > 50) {
        toast.error("Tên hiển thị không được quá 50 ký tự");
        return;
      }
      let response = await axiosPrivate.post(
        process.env.REACT_APP_CHANGE_USER_INFORMATION,
        {
          fullname: updatedName,
        }
      );
      if (response) {
        setMyUser({ ...myUser, fullName: updatedName });
        toast.success("Thay đổi thông tin thành công");
      }
    } catch (error) {}
  };
  const verifyPassword = async () => {
    try {
      let response = await axios.post(process.env.REACT_APP_LOGIN_API, {
        username: myUser?.username,
        password: newPassword,
      });
      if (response) return true;
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      } else if (error?.response?.status === 401) {
        return false;
      }
    }
  };
  const changeUserEmail = async () => {
    try {
      if (updatedEmail === myUser?.email) {
        toast.error("Bạn chưa thay đổi thông tin nào");
        setNewPassword("");
        return;
      } else if (!regex.test(updatedEmail)) {
        toast.error("Email không hợp lệ");
        setNewPassword("");
        return;
      }
      let isUser = await verifyPassword();
      if (isUser) {
        let response = await axiosPrivate.post(
          process.env.REACT_APP_CHANGE_USER_EMAIL,
          {
            email: updatedEmail,
          }
        );
        if (response) {
          setMyUser({ ...myUser, email: updatedEmail });
          toast.success("Thay đổi email thành công");
          setNewPassword("");
        }
      } else {
        toast.error("Mật khẩu không đúng");
        setNewPassword("");
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      } else if (error?.response?.status === 302) {
        toast.error("Email đã tồn tại trong hệ thống");
        setUpdatedEmail(myUser?.email);
        setNewPassword("");
      }
    }
  };
  const changePassword = async () => {
    try {
      if (newPassword !== confirmNewPassword) {
        toast.error("Mật khẩu mới không khớp");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        return;
      }
      let response = await axiosPrivate.post(
        process.env.REACT_APP_CHANGE_PASSWORD,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      );
      if (response) {
        toast.success("Đổi mật khẩu thành công");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      if (error?.response?.status === 405) {
        toast.error("Tài khoản của bạn đã bị khóa");
        navigate("/login", { replace: true });
        localStorage.removeItem("auth");
      } else if (error?.response?.status === 401) {
        toast.error("Mật khẩu cũ không đúng");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    }
  };
  return (
    <EditProfile
      profile={myUser}
      updatedEmail={updatedEmail}
      setUpdatedEmail={setUpdatedEmail}
      updatedName={updatedName}
      setUpdatedName={setUpdatedName}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      oldPassword={oldPassword}
      setOldPassword={setOldPassword}
      changePassword={changePassword}
      isSelected={isSelected}
      setIsSelected={setIsSelected}
      changeUserInfo={changeUserInfo}
      changeUserEmail={changeUserEmail}
      confirmNewPassword={confirmNewPassword}
      setConfirmNewPassword={setConfirmNewPassword}
    />
  );
}
