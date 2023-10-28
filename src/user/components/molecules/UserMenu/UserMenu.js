import { Divider, IconButton, MenuList, Paper } from "@mui/material";
import React from "react";
import IconMenuOption from "../../atoms/IconMenuOption/IconMenuOption";
import useAuth from "../../../hooks/useAuth";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
export default function                           UserMenu({ ...props }) {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("coverURL");
    localStorage.removeItem("content");
    localStorage.removeItem("title");
    navigate("/login");
  };
  const auth = useAuth();
  return (
    <Paper sx={{ width: "180px", p: "0 2px"}}>
      <MenuList>
        {auth?.role == "student" &&
          props.student.map((item) => (
            <IconMenuOption
              path={item.path}
              key={item.text}
              label={item.text}
              icon={item.icon}
            />
          ))}
        {auth?.role == "mentor" &&
          props.mentor.map((item) => (
            <IconMenuOption
              path={item.path}
              key={item.text}
              label={item.text}
              icon={item.icon}
            />
          ))}
        {auth?.role == "lecturer" &&
          props.lecturer.map((item) => (
            <IconMenuOption
              path={item.path}
              key={item.text}
              label={item.text}
              icon={item.icon}
            />
          ))}
        <Divider orientation="horizontal" />
        <IconMenuOption
          label="Đăng xuất"
          icon={
            <Icon icon="mdi:logout-variant" width={22} rotate={2} color="red" />
          }
          color="red"
          onClick={handleClick}
        />
      </MenuList>
    </Paper>
  );
}
