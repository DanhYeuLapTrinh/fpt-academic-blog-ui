import "./App.css";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loggedInRoutes, publicRoutes } from "./user/routes/routes";
import Home from "./user/components/pages/Home/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((item, index) => {
            const Layout = item.layout;
            const Page = item.component;
            return (
              <Route
                key={index}
                path={item.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
          {loggedInRoutes.map((item, index) => {
            const Page = item.component;
            return <Route key={index} path={item.path} element={<Page />} />;
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
