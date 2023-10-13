import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loggedInRoutes, publicRoutes } from "./user/routes/routes";
import HomeLayout from "./user/layouts/HomeLayout";
import LoginLayout from "./user/layouts/LoginLayout";
import RequireAuth from "./user/utils/RequireAuth";
import Unauthorized from "./user/components/pages/Unauthorized/Unauthorized";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginLayout />}>
            {publicRoutes.map((item, index) => {
              const Page = item.component;
              return <Route key={index} path={item.path} element={<Page />} />;
            })}
          </Route>
          <Route element={<HomeLayout />} >
            <Route element={<RequireAuth allowRoles={["student"]}/>} >
              {loggedInRoutes.map((item, index) => {
                const Page = item.component;
                return (
                  <Route key={index} path={item.path} element={<Page />} />
                );
              })}
            </Route>
          </Route>
          <Route path="*" element={<Unauthorized/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
