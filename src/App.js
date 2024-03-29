import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./user/layouts/HomeLayout";
import LoginLayout from "./user/layouts/LoginLayout";
import AdminLayout from "./admin/layouts/AdminLayout/dashboard/DashboardLayout";
import RequireAuth from "./user/utils/RequireAuth";
import Unauthorized from "./user/components/pages/Unauthorized/Unauthorized";
import RequireEmail from "./user/utils/RequireEmail";
import {
  loggedInUserRoutes,
  publicRoutes,
  recoverPasswordRoutes,
  loggedInAdminRoutes,
  lecturerRoutes,
  mentorRoutes,
  lecturerRoutesOther,
  mentorRoutesOther,
  loggedInUserRoutesOther,
} from "./master/routes";
import ManagePostLayout from "./user/layouts/ManagePostLayout";
import ManageQuestionLayout from "./user/layouts/ManageQuestionLayout";
import HasAuth from "./user/utils/HasAuth";
import NoFooterLayout from "./user/layouts/NoFooterLayout";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Puclic routes */}
          <Route element={<HasAuth />}>
            <Route element={<LoginLayout />}>
              {publicRoutes.map((item, index) => {
                const Page = item.component;
                return (
                  <Route key={index} path={item.path} element={<Page />} />
                );
              })}
            </Route>
            {/* Reset password routes */}
            <Route element={<LoginLayout />}>
              <Route element={<RequireEmail />}>
                {recoverPasswordRoutes.map((item, index) => {
                  const Page = item.component;
                  return (
                    <Route key={index} path={item.path} element={<Page />} />
                  );
                })}
              </Route>
            </Route>
          </Route>
          {/* Logged in user routes */}
          <Route element={<HomeLayout />}>
            <Route
              element={
                <RequireAuth allowRoles={["student", "mentor", "lecturer"]} />
              }
            >
              {loggedInUserRoutes.map((item, index) => {
                const Page = item.component;
                return (
                  <Route key={index} path={item.path} element={<Page />} />
                );
              })}
            </Route>
          </Route>
          {/* Logged in user routes no footer*/}
          <Route element={<NoFooterLayout />}>
            <Route
              element={
                <RequireAuth allowRoles={["student", "mentor", "lecturer"]} />
              }
            >
              {loggedInUserRoutesOther.map((item, index) => {
                const Page = item.component;
                return (
                  <Route key={index} path={item.path} element={<Page />} />
                );
              })}
            </Route>
          </Route>
          {/* Logged in lecturer routes */}
          <Route element={<NoFooterLayout />}>
            <Route element={<ManagePostLayout />}>
              <Route element={<RequireAuth allowRoles={["lecturer"]} />}>
                {lecturerRoutes.map((item, index) => {
                  const Page = item.component;
                  return (
                    <Route key={index} path={item.path} element={<Page />} />
                  );
                })}
              </Route>
            </Route>
            {lecturerRoutesOther.map((item, index) => {
              const Page = item.component;
              return <Route key={index} path={item.path} element={<Page />} />;
            })}
          </Route>
          {/* Logged in mentor routes */}
          <Route element={<HomeLayout />}>
            <Route element={<ManageQuestionLayout />}>
              <Route element={<RequireAuth allowRoles={["mentor"]} />}>
                {mentorRoutes.map((item, index) => {
                  const Page = item.component;
                  return (
                    <Route key={index} path={item.path} element={<Page />} />
                  );
                })}
              </Route>
            </Route>
            <Route element={<RequireAuth allowRoles={["mentor"]} />}>
              {mentorRoutesOther.map((item, index) => {
                const Page = item.component;
                return (
                  <Route key={index} path={item.path} element={<Page />} />
                );
              })}
            </Route>
          </Route>
          {/* Logged in admin routes */}
          <Route element={<AdminLayout />}>
            <Route element={<RequireAuth allowRoles={["admin"]} />}>
              {loggedInAdminRoutes.map((item, index) => {
                const Page = item.component;
                return (
                  <Route key={index} path={item.path} element={<Page />} />
                );
              })}
            </Route>
          </Route>
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
