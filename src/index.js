import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import { MyTheme } from "./user/theme/MyTheme";
import { LoginProvider } from "./user/context/LoginProvider";
import AuthProvider from "./user/context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={MyTheme}>
   <AuthProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
   </AuthProvider>
  </ThemeProvider>
);
reportWebVitals();
