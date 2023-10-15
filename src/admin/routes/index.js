import { lazy } from "react";
const Welcome = lazy(() => import("../components/pages/Welcome/Welcome"));
//User Page
const UserList = lazy(() => import("../components/pages/Users/UserList"));
const AddNewUserPage = lazy(() =>
  import("../components/pages/Users/AddNewUserPage")
);
const BanAccount = lazy(() => import("../components/pages/Users/BanAccount"));
//Category Page
const CategoriesListPage = lazy(() =>
  import("../components/pages/Categories/CategoriesListPage")
);
const AddNewCategory = lazy(() =>
  import("../components/pages/Categories/AddNewCategory")
);
const EditCategory = lazy(() =>
  import("../components/pages/Categories/EditCategory")
);
const DeleteCategory = lazy(() =>
  import("../components/pages/Categories/DeleteCategory")
);
//Tags Page
const TagListPage = lazy(() => import("../components/pages/Tags/TagListPage"));
const AddNewTagPage = lazy(() =>
  import("../components/pages/Tags/AddNewTagPage")
);
const EditTagPage = lazy(() => import("../components/pages/Tags/EditTagPage"));
const DeleteTagPage = lazy(() =>
  import("../components/pages/Tags/DeleteTagPage")
);
//Reports Page
const ReportedProfilePage = lazy(() =>
  import("../components/pages/Reports/ReportedProfilePage")
);
const ReportedCommentPage = lazy(() =>
  import("../components/pages/Reports/ReportedCommentPage")
);
//Activity Log Page
const ActivityLogPage = lazy(() =>
  import("../components/pages/ActivityLog/ActivityLogPage")
);
//Setting Page
const SettingPage = lazy(() =>
  import("../components/pages/Setting/SettingPage")
);

export const publicRoutes = [
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
