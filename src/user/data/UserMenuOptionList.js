import { Icon } from "@iconify/react";
export const UserMenuOptionsList = [
  {
    path: "",
    label: "Thông tin tài khoản",
    icon: (
      <Icon
        icon="material-symbols:info"
        color="#444746"
        width="22"
        height="22"
      />
    ),
    role: "public",
  },
  {
    path: "",
    label: "Xem tài khoản",
    icon: (
      <Icon icon="clarity:user-solid" color="#444746" width="22" height="22" />
    ),
    role: "public",
  },
  {
    path: "",
    label: "Nháp",
    icon: <Icon icon="mdi:draft" color="#444746" width="22" height="22" />,
    role: "public",
  },
  {
    path: "",
    label: "Danh sách yêu thích",
    icon: (
      <Icon icon="ic:round-bookmark" color="#444746" width="22" height="22" />
    ),
    role: "public",
  },
  {
    path: "/pending-posts",
    label: "Quản lý bài viết",
    icon: (
      <Icon
        icon="material-symbols:bookmark-manager-rounded"
        color="#444746"
        width="22"
        height="22"
      />
    ),
    role: "lecturer",
  },
  {
    path: "",
    label: "Quản lý câu hỏi",
    icon: (
      <Icon icon="ri:question-fill" color="#444746" width="22" height="22" />
    ),
    role: "mentor",
  },
];
