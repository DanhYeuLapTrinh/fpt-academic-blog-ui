import Home from "../user/components/pages/Home/Home";
import LoginForm from "../user/components/organisms/LoginForm/LoginForm";
import EmailEntryForm from "../user/components/organisms/EmailEntryForm/EmailEntryForm";
import OTPForm from "../user/components/organisms/OTPForm/OTPForm";
import RecoverPasswordForm from "../user/components/organisms/RecoverPasswordForm/RecoverPasswordForm";
import Feed from "../user/components/pages/Feed/Feed";
import News from "../user/components/pages/News/News";

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
];

const loggedInAdminRoutes = [
  //Welcome Page
  { path: "/", component: Welcome },
  //User
  { path: "/users", component: UserList },
  { path: "/add-user", component: AddNewUserPage },
  { path: "/ban-user", component: BanAccount },
  //Categories Page
  { path: "/categories-list", component: CategoriesListPage },
  { path: "/add-category", component: AddNewCategory },
  { path: "/edit-category", component: EditCategory },
  { path: "/delete-category", component: DeleteCategory },
  //Tags Page
  { path: "/tags-list", component: TagListPage },
  { path: "/add-tag", component: AddNewTagPage },
  { path: "/edit-tag", component: EditTagPage },
  { path: "/delete-tag", component: DeleteTagPage },
  //Reports Page
  { path: "/reported-profile", component: ReportedProfilePage },
  { path: "/reported-comment", component: ReportedCommentPage },
  //Activity Log Page
  { path: "/activity-log", component: ActivityLogPage },
  //Setting Page
  { path: "/setting", component: SettingPage },
];

export { publicRoutes, loggedInUserRoutes, recoverPasswordRoutes, loggedInAdminRoutes };
