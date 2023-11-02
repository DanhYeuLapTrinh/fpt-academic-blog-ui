// component
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DescriptionIcon from "@mui/icons-material/Description";
import BlockIcon from "@mui/icons-material/Block";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "Dashboard",
    path: "/welcome",
    icon: <DashboardIcon />,
  },
  {
    title: "Danh sách người dùng",
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
  },
  {
    title: "Nhật ký hoạt động",
    path: "/",
    icon: <DescriptionIcon />,
  },
];

export default navConfig;
