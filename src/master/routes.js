import Home from "../user/components/pages/Home/Home";
import LoginForm from "../user/components/organisms/LoginForm/LoginForm";
import EmailEntryForm from "../user/components/organisms/EmailEntryForm/EmailEntryForm";
import OTPForm from "../user/components/organisms/OTPForm/OTPForm";
import RecoverPasswordForm from "../user/components/organisms/RecoverPasswordForm/RecoverPasswordForm";
import Feed from "../user/components/pages/Feed/Feed";
import News from "../user/components/pages/News/News";
//Admin Routes
import Welcome from "../admin/components/pages/Welcome/Welcome";
import UserList from "../admin/components/pages/Users/UserList";
import CategoriesListPage from "../admin/components/pages/Categories/CategoriesListPage";
import AddNewCategory from "../admin/components/pages/Categories/AddNewCategory";
import TagListPage from "../admin/components/pages/Tags/TagListPage";
import EditTagPage from "../admin/components/pages/Tags/EditTagPage";
import ReportedProfilePage from "../admin/components/pages/Reports/ReportedProfilePage";
import ReportedCommentPage from "../admin/components/pages/Reports/ReportedCommentPage";
import ActivityLogPage from "../admin/components/pages/ActivityLog/ActivityLogPage";
import SettingPage from "../admin/components/pages/Setting/SettingPage";
import WriteService from "../user/components/pages/Write/WriteService";
import PendingPostsService from "../user/components/pages/PendingPosts/PendingPostsService";

const publicRoutes = [
  { path: "/login", component: LoginForm },
  { path: "/email-entry", component: EmailEntryForm },
];
const recoverPasswordRoutes = [
  { path: "/otp", component: OTPForm },
  { path: "/recover-password", component: RecoverPasswordForm },
];

const loggedInUserRoutes = [
  { path: "/", component: Home },
  { path: "/feed", component: Feed },
  { path: "/news", component: News },
  { path: "/write", component: WriteService },
];
const lecturerRoutes = [{ path: "/pending-posts", component: PendingPostsService }];

const loggedInAdminRoutes = [
  //Welcome Page
  { path: "/welcome", component: Welcome },
  //User
  { path: "/users", component: UserList },

  //Categories Page
  { path: "/categories-list", component: CategoriesListPage },
  //Tags Page
  { path: "/tags-list", component: TagListPage },
  { path: "/edit-tag", component: EditTagPage },
  //Reports Page
  { path: "/reported-profile", component: ReportedProfilePage },
  { path: "/reported-comment", component: ReportedCommentPage },
  //Activity Log Page
  { path: "/activity-log", component: ActivityLogPage },
  //Setting Page
  { path: "/setting", component: SettingPage },
];

export {
  publicRoutes,
  loggedInUserRoutes,
  recoverPasswordRoutes,
  loggedInAdminRoutes,
  lecturerRoutes
};
