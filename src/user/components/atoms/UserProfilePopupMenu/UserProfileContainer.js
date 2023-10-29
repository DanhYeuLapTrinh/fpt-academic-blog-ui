import React, { useState } from "react";
import UserProfile from "./UserProfile";
import Text from "../Text/Text";
import { Divider, Menu, MenuItem } from "@mui/material";
import { UserMenuOptionsList } from "../../../data/UserMenuOptionList";
import useAuth from "../../../hooks/useAuth";
import UserMenuOption from "../../molecules/UserMenuOption/UserMenuOption";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "../../../api/axios";

export default function UserProfileContainer() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    const response = await axios.post(process.env.REACT_APP_LOGOUT_API, {
      refreshToken: auth?.refreshToken,
    });
    if (response) {
      localStorage.removeItem("auth");
      navigate("/login");
    }
  };
  const auth = useAuth();
  const filteredOption = UserMenuOptionsList.filter((item) => {
    return item.role === "public" || item.role === auth?.role;
  });
  return (
    <>
      <UserProfile src={auth?.profileURL} handleClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {filteredOption?.map((item) => (
          <Link to={item.path}>
            <UserMenuOption
              key={item.label}
              icon={item.icon}
              handleClose={handleClose}
              label={item.label}
            />
          </Link>
        ))}
        <Divider orientation="horizontal" />
        <UserMenuOption
          icon={
            <Icon
              icon="mdi:logout-variant"
              color="red"
              width="22"
              height="22"
              rotate={2}
            />
          }
          handleLogout={handleLogout}
          label="Đăng xuất"
          color="red"
        />
      </Menu>
    </>
  );
}
