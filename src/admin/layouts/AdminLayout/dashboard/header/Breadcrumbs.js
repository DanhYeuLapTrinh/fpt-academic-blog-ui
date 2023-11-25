import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import HubIcon from "@mui/icons-material/Hub";
import FiberNewIcon from "@mui/icons-material/FiberNew";

export const breadCrumbsRoutes = [
  {
    path: "/welcome",
    label: "Dashboard",
    icon: <DashboardIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  //User
  {
    path: "/users",
    label: "Danh sách tài khoản",
    icon: <PeopleIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },

  //Categories Page
  {
    path: "/categories-list",
    label: "Danh sách danh mục",
    icon: <CategoryIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  //Tags Page
  {
    path: "/tags-list",
    label: "Danh sách thẻ",
    icon: <LocalOfferIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  {
    path: "/edit-tag",
    label: "Chỉnh sửa thẻ",
    icon: <LocalOfferIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  //Reports Page
  {
    path: "/reported-profile",
    label: "Danh sách hồ sơ bị báo cáo",
    icon: <ReportProblemIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  {
    path: "/reported-comment",
    label: "Danh sách bình luận bị báo cáo",
    icon: <ReportProblemIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  {
    path: "/reported-profile/view/:reportedUserId",
    label: "Chi tiết hồ sơ bị báo cáo",
    icon: <ReportProblemIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  //News Page
  {
    path: "/news-admin",
    label: "Danh sách tin tức",
    icon: <FiberNewIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  { path: "news/view/:id", label: "Chi tiết tin tức" },
  {
    path: "/add-news",
    label: "Thêm tin tức",
    icon: <FiberNewIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  {
    path: "/skills-list",
    label: "Danh sách kỹ năng",
    icon: <HubIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  {
    path: "/edit-skill",
    label: "Thêm kỹ năng",
    icon: <HubIcon sx={{ marginRight: 0.5, fontSize: "inherit" }} />,
  },
  {
    path: "/users/view/:id",
    label: "Chi tiết hồ sơ",
  },
];
