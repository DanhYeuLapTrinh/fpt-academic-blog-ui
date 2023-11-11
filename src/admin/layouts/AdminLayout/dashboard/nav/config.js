// component
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FiberNewIcon from "@mui/icons-material/FiberNew";

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "Dashboard",
    path: "/welcome",
    icon: <DashboardIcon />,
  },
  {
    title: "Danh sách tài khoản",
    path: "/users",
    icon: <PeopleIcon />,
  },
  {
    title: "Danh sách danh mục",
    path: "/categories-list",
    icon: <CategoryIcon />,
  },
  {
    title: "Thẻ",
    icon: <LocalOfferIcon />,
    items: [
      {
        title: "Danh sách thẻ",
        path: "/tags-list",
        icon: <FiberManualRecordIcon sx={{ fontSize: "small" }} />,
      },
      {
        title: "Chỉnh sửa thẻ",
        path: "/edit-tag",
        icon: <FiberManualRecordIcon sx={{ fontSize: "small" }} />,
      },
    ],
  },
  {
    title: "Báo cáo",
    path: "/",
    icon: <ReportProblemIcon />,
    items: [
      {
        title: "Danh sách hồ sơ bị báo cáo",
        path: "/reported-profile",
        icon: <FiberManualRecordIcon sx={{ fontSize: "small" }} />,
      },
      {
        title: "Danh sách bình luận bị báo cáo",
        path: "/reported-comment",
        icon: <FiberManualRecordIcon sx={{ fontSize: "small" }} />,
      },
    ],
  },
  {
    title: "Tin tức mới nhất",
    icon: <FiberNewIcon />,
    items: [
      {
        title: "Danh sách tin tức",
        path: "/news-admin",
        icon: <FiberManualRecordIcon sx={{ fontSize: "small" }} />,
      },
      {
        title: "Thêm tin tức",
        path: "/add-news",
        icon: <FiberManualRecordIcon sx={{ fontSize: "small" }} />,
      },
    ],
  },
];

export default navConfig;
