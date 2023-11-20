import React from "react";
import Header from "../components/organisms/Header/Header";
import { Divider } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function NoFooterLayout() {
  return (
    <div style={{minHeight: '100vh'}}>
      <Header />
      <Divider orientation="horizontal" sx={{ width: "100%" }} />
      <Outlet />
    </div>
  );
}
