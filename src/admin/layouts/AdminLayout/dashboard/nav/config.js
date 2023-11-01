// component
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import DescriptionIcon from "@mui/icons-material/Description";
import BlockIcon from "@mui/icons-material/Block";
// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "dashboard",
    path: "/welcome",
    icon: <DashboardIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "Danh sách người dùng",
    path: "/users",
    icon: <PeopleIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "Danh sách danh mục",
    path: "/dashboard/products",
    icon: <CategoryIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "Thẻ",
    path: "/",
    icon: <LocalOfferIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "Báo cáo",
    path: "/",
    icon: <ReportProblemIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "Nhật ký hoạt động",
    path: "/",
    icon: <DescriptionIcon sx={{ width: 1, height: 1 }} />,
  },
  {
    title: "Not found",
    path: "/404",
    icon: <BlockIcon sx={{ width: 1, height: 1 }} />,
  },
];

export default navConfig;
