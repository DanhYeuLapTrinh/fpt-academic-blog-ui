import React from "react";
import Header from "../components/organisms/Header/Header";
import { Outlet } from "react-router-dom";
import { Container, Divider } from "@mui/material";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Divider orientation="horizontal" sx={{ width: "100%" }} />
      <Outlet />
    </>
  );
}
