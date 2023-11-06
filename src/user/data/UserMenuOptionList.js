import { Icon } from "@iconify/react";
import useAuth from "../hooks/useAuth";
import React from 'react'
const auth = JSON.parse(localStorage.getItem("auth"))
export const UserMenuOptionsListData = [
  {
    path: "",
    label: "Thông tin tài khoản",
    icon: <Icon icon="uil:setting" color="#444746" width="24" />,
    role: "public",
  },
  {
    path: `/profile/${auth?.id}`,
    label: "Xem tài khoản",
    icon: <Icon icon="mingcute:user-2-line" color="#444746" width="24" />,
    role: "public",
  },
  {
    path: "",
    label: "Nháp",
    icon: <Icon icon="ri:draft-line" color="#444746" width="24" />,
    role: "public",
  },
  {
    path: "",
    label: "Danh sách yêu thích",
    icon: <Icon icon="ri:bookmark-line" color="#444746" width="24" />,
    role: "public",
  },
  {
    path: "/pending-posts",
    label: "Quản lý bài viết",
    icon: (
      <Icon
        icon="material-symbols:pending-actions"
        color="#444746"
        width="24"
      />
    ),
    role: "lecturer",
  },
  {
    path: "/pending-q",
    label: "Quản lý câu hỏi",
    icon: (
      <Icon icon="akar-icons:chat-question" color="#444746" width="24" />
    ),
    role: "mentor",
  },
];
