import Sidebar from "./AdminLayout/Sidebar/Sidebar";
import NavigationBar from "./AdminLayout/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <NavigationBar />
      <div className="container flex max-w-full">
        <Sidebar />
        <div className="content flex-1 max-w-1213 bg-background">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
