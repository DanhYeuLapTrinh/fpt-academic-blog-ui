import { Divider, Menu } from "@mui/material";
import React from "react";
import UserMenuOption from "../../molecules/UserMenuOption/UserMenuOption";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function UserMenuOptionsList(props) {
  return (
    <Menu
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
      onClick={props.handleClose}
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
      {/* <Link to={`/profile/edit`} style={{ textDecoration: "none" }}>
        <UserMenuOption
          icon={<Icon icon="uil:setting" color="#444746" width="24" />}
          handleClose={props.handleClose}
          label="Thông tin tài khoản"
        />
      </Link> */}
      <Link
        to={`/profile/${props.auth?.id}`}
        style={{ textDecoration: "none" }}
      >
        <UserMenuOption
          icon={<Icon icon="mingcute:user-2-line" color="#444746" width="24" />}
          handleClose={props.handleClose}
          label="Xem tài khoản"
        />
      </Link>
      <Link to={`/draft`} style={{ textDecoration: "none" }}>
        <UserMenuOption
          icon={<Icon icon="ri:draft-line" color="#444746" width="24" />}
          handleClose={props.handleClose}
          label="Nháp"
        />
      </Link>
      <Link to={`/favorite`} style={{ textDecoration: "none" }}>
        <UserMenuOption
          icon={<Icon icon="ri:bookmark-line" color="#444746" width="24" />}
          handleClose={props.handleClose}
          label="Danh sách yêu thích"
        />
      </Link>
      {props.auth.role === "lecturer" && (
        <Link to={"/pending-posts"} style={{ textDecoration: "none" }}>
          <UserMenuOption
            icon={
              <Icon
                icon="material-symbols:pending-actions"
                color="#444746"
                width="24"
              />
            }
            handleClose={props.handleClose}
            label="Quản lý bài viết"
          />
        </Link>
      )}
      {props.auth.role === "lecturer" && (
        <Link to={"/pending-reward"} style={{ textDecoration: "none" }}>
          <UserMenuOption
            icon={
              <Icon
                icon="material-symbols:rewarded-ads-outline-rounded"
                color="#444746"
                width="24"
              />
            }
            handleClose={props.handleClose}
            label="Danh sách chờ xét thưởng"
          />
        </Link>
      )}
      {props.auth.role === "mentor" && (
        <Link to={"/pending-questions"} style={{ textDecoration: "none" }}>
          <UserMenuOption
            icon={
              <Icon
                icon="akar-icons:chat-question"
                color="#444746"
                width="24"
              />
            }
            handleClose={props.handleClose}
            label="Quản lý câu hỏi"
          />
        </Link>
      )}
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
        handleLogout={props.handleLogout}
        label="Đăng xuất"
        color="red"
      />
    </Menu>
  );
}
