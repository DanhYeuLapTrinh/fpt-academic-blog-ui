// component
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DescriptionIcon from "@mui/icons-material/Description";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
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
    title: "Nhật ký hoạt động",
    path: "/activity-log",
    icon: <DescriptionIcon />,
  },
];

export default navConfig;
