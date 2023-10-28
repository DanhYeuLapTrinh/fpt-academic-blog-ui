import { Icon } from "@iconify/react";
const navList = [
  { path: "/home", text: "Trang chủ" },
  { path: "/feed", text: "Bảng tin" },
  { path: "/news", text: "Tin tức" },
  { path: "/about", text: "Về chúng tôi" },
];
const studentMenuList = [
  {
    path: "/edit",
    text: "Thông tin tài khoản",
    icon: <Icon icon="icon-park-solid:setting-two" width={22} />,
  },
  {
    path: "/view/:username",
    text: "Xem tài khoản",
    icon: <Icon icon="clarity:user-solid" width={22} />,
  },
  { path: "/draft", text: "Nháp", icon: <Icon icon="ri:draft-fill" width={22} /> },
  {
    path: "/save",
    text: "Danh sách yêu thích",
    icon: <Icon icon="tabler:bookmark-filled" width={22} />,
  },
];
const mentorMenuList = [
  {
    path: "/edit",
    text: "Thông tin tài khoản",
    icon: <Icon icon="icon-park-solid:setting-two" width={22} />,
  },
  {
    path: "view/:username",
    text: "Xem tài khoản",
    icon: <Icon icon="clarity:user-solid" width={22} />,
  },
  { path: "/draft", text: "Nháp", icon: <Icon icon="ri:draft-fill" width={22} /> },
  {
    path: "/save",
    text: "Danh sách yêu thích",
    icon: <Icon icon="tabler:bookmark-filled" width={22} />,
  },
  {
    path: "/pending-q&a",
    text: "Quản lý câu hỏi",
    icon: <Icon icon="fluent:book-question-mark-24-filled" width={22} />,
  },
];
const lecturerMenuList = [
  {
    path: "/edit",
    text: "Thông tin tài khoản",
    icon: <Icon icon="icon-park-solid:setting-two" width={22} />,
  },
  {
    path: "/view/:username",
    text: "Xem tài khoản",
    icon: <Icon icon="clarity:user-solid" width={22} />,
  },
  { path: "/draft", text: "Nháp", icon: <Icon icon="ri:draft-fill" width={22} /> },
  {
    path: "/save",
    text: "Danh sách yêu thích",
    icon: <Icon icon="tabler:bookmark-filled" width={22} />,
  },
  { path: "/pending-posts", text: "Quản lý bài viết", icon: <Icon icon="mdi:post-it-note" width={22} /> },
];
export { navList, studentMenuList, mentorMenuList, lecturerMenuList };
