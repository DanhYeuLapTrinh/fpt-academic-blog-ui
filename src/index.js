import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import { MyTheme } from "./user/theme/MyTheme";
import { LoginProvider } from "./user/context/LoginProvider";
import AuthProvider from "./user/context/AuthProvider";
import PostTagProvider from "./user/context/PostTagProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={MyTheme}>
     <PostTagProvider>
       <AuthProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
       </AuthProvider>
     </PostTagProvider>
  </ThemeProvider>
);
reportWebVitals();
