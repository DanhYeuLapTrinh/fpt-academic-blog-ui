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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={MyTheme}>
    <ErrorProvider>
      <ContentProvider>
        <PostTagProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </PostTagProvider>
      </ContentProvider>
    </ErrorProvider>
  </ThemeProvider>
);
reportWebVitals();
