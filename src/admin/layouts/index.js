import Sidebar from "./AdminLayout/Sidebar/Sidebar";
import NavigationBar from "./AdminLayout/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/index.css";
function AdminLayout() {
  return (
    <div className="flex h-screen">
      <div className="text-gray-100 p-3 w-100">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto">
        <header className="text-gray-100 sticky top-0">
          <NavigationBar />
        </header>

        <main className="bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
