import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loggedInUserRoutes, publicRoutes, recoverPasswordRoutes } from "./user/routes/routes";
import HomeLayout from "./user/layouts/HomeLayout";
import LoginLayout from "./user/layouts/LoginLayout";
import RequireAuth from "./user/utils/RequireAuth";
import Unauthorized from "./user/components/pages/Unauthorized/Unauthorized";
import RequireEmail from "./user/utils/RequireEmail";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Puclic routes */}
          <Route element={<LoginLayout />}>
            {publicRoutes.map((item, index) => {
              const Page = item.component;
              return <Route key={index} path={item.path} element={<Page />} />;
            })}
          </Route>
          {/* Reset password routes */}
          <Route element={<LoginLayout />}>
            <Route element={<RequireEmail />}>
            {recoverPasswordRoutes.map((item, index) => {
              const Page = item.component;
              return <Route key={index} path={item.path} element={<Page />} />;
            })}
            </Route>
          </Route>
          {/* Logged in dser routes */}
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
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
