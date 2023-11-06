import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import { MyTheme } from "./user/theme/MyTheme";
import { LoginProvider } from "./user/context/LoginProvider";
import PostTagProvider from "./user/context/PostTagProvider";
import ContentProvider from "./user/context/ContentProvider";
import ErrorProvider from "./user/context/ErrorProvider";
import HomeProvider from "./user/context/HomeProvider";
import ManagePostProvider from "./user/context/ManagePostProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={MyTheme}>
    <ManagePostProvider>
      <HomeProvider>
        <ErrorProvider>
          <ContentProvider>
            <PostTagProvider>
              <LoginProvider>
                <App />
                <ToastContainer theme="colored"/>
              </LoginProvider>
            </PostTagProvider>
          </ContentProvider>
        </ErrorProvider>
      </HomeProvider>
    </ManagePostProvider>
  </ThemeProvider>
);
reportWebVitals();
