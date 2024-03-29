import React, { useState } from "react";
import UserMenuOptionsList from "./UserMenuOptionsList";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import UserProfile from "../../atoms/UserProfile/UserProfile";
import useAuth from "../../../hooks/useAuth";
import { UserMenuOptionsListData } from "../../../data/UserMenuOptionList";
import useProfile from "../../../hooks/useProfile";

export default function UserMenuOptionsListContainer() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const auth = useAuth();
  const {avatarURL, setSkills} = useProfile()
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_LOGOUT_API, {
        refreshToken: auth?.refreshToken,
      });
      if (response) {
        localStorage.removeItem("auth");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("auth");
      navigate("/login", { replace: true })
    }
  };
  return (
    <>
      <UserMenuOptionsList
        handleLogout={handleLogout}
        handleClose={handleClose}
        anchorEl={anchorEl}
        open={open}
        auth={auth}
      />
      <UserProfile src={avatarURL} handleClick={handleClick} />
    </>
  );
}
