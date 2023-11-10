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
import TagListPage from "../admin/components/pages/Tags/TagListPage";
import EditTagPage from "../admin/components/pages/Tags/EditTagPage";
import ReportedProfilePage from "../admin/components/pages/Reports/ReportedProfilePage";
import ReportedCommentPage from "../admin/components/pages/Reports/ReportedCommentPage";
import NewsPage from "../admin/components/pages/NewsPage/NewsPage";
import AddNews from "../admin/components/pages/AddNews/AddNews";
import DetailNew from "../admin/components/pages/DetailNew/DetailNew";
import ReportedProfileDetail from "../admin/components/pages/ReportedProfileDetail/ReportedProfileDetail";
import ActivityLogPage from "../admin/components/pages/ActivityLog/ActivityLogPage";
import SettingPage from "../admin/components/pages/Setting/SettingPage";

import WriteService from "../user/components/pages/Write/WriteService";
import PendingPostsService from "../user/components/pages/PendingPosts/PendingPostsService";
import PendingQuestionsService from "../user/components/pages/PendingQuestions/PendingQuestionsService";
import ViewPendingPostService from "../user/components/pages/ViewAPost/ViewPendingPost/ViewPendingPostService";
import HomeService from "../user/components/pages/Home/HomeService";
import ViewAPostService from "../user/components/pages/ViewAPost/ViewAPost/ViewAPostService";
import ApprovedPostService from "../user/components/pages/ApprovedPosts/ApprovedPostService";
import ViewProfileService from "../user/components/pages/ViewProfile/ViewProfileService";
import ApprovedQuestionsService from "../user/components/pages/ApprovedQuestions/ApprovedQuestionsService";
import CategoriesService from "../user/components/pages/Categories/CategoriesService";
import TrendingPostsSeeMoreService from "../user/components/pages/SeeMore/TrendingPostsSeeMore/TrendingPostsSeeMoreService";
import LatestPostsSeeMoreService from "../user/components/pages/SeeMore/LatestPostsSeeMore/LatestPostsSeeMoreService";
import TagsService from "../user/components/pages/Tags/TagsService";
import RewardedPostsSeeMoreService from "../user/components/pages/SeeMore/RewardedPostsSeeMore/RewardedPostsSeeMoreService";
import ShortPostSeeMoreService from "../user/components/pages/SeeMore/ShortPostsSeeMore/ShortPostSeeMoreService";
import ViewPendingQuestionService from "../user/components/pages/ViewAPost/ViewPendingQuestion/ViewPendingQuestionService";

const publicRoutes = [
  { path: "/login", component: LoginForm },
  { path: "/email-entry", component: EmailEntryForm },
];
const recoverPasswordRoutes = [
  { path: "/otp", component: OTPForm },
  { path: "/recover-password", component: RecoverPasswordForm },
];

const loggedInUserRoutes = [
  { path: "/", component: HomeService },
  { path: "/feed", component: Feed },
  { path: "/news", component: News },
  { path: "/write", component: WriteService },
  { path: "/trending", component: TrendingPostsSeeMoreService },
  { path: "/latest", component: LatestPostsSeeMoreService },
  { path: "/rewarded", component: RewardedPostsSeeMoreService },
  { path: "/shorts", component: ShortPostSeeMoreService },
  { path: "/categories", component: CategoriesService },
  { path: "/tags", component: TagsService },
  { path: "/view/:slug", component: ViewAPostService },
  { path: "/profile/:id", component: ViewProfileService },
  { path: "/profile/:id/question", component: ViewProfileService },
];
const lecturerRoutes = [
  { path: "/pending-posts", component: PendingPostsService },
  { path: "/approved-posts", component: ApprovedPostService },
];

const lecturerRoutesOther = [
  { path: "/pending-posts/:slug", component: ViewPendingPostService },
];

const mentorRoutes = [
  { path: "/pending-questions", component: PendingQuestionsService },
  { path: "/approved-questions", component: ApprovedQuestionsService },
];

const mentorRoutesOther = [
  { path: "/pending-questions/:slug", component: ViewPendingQuestionService },
];

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
  {
    path: "/reported-profile/view/:reportedUserId",
    component: ReportedProfileDetail,
  },
  { path: "/reported-comment", component: ReportedCommentPage },
  //Activity Log Page
  { path: "/activity-log", component: ActivityLogPage },
  //News Page
  { path: "/news-admin", component: NewsPage },
  { path: "news/view/:id", component: DetailNew },
  { path: "/add-news", component: AddNews },
  //Setting Page
  { path: "/setting", component: SettingPage },
];

export {
  publicRoutes,
  loggedInUserRoutes,
  recoverPasswordRoutes,
  loggedInAdminRoutes,
  lecturerRoutes,
  mentorRoutes,
  lecturerRoutesOther,
  mentorRoutesOther
};
