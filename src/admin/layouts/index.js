import Sidebar from "./AdminLayout/Sidebar/Sidebar";
import NavigationBar from "./AdminLayout/Navbar/Navbar";
import React from "react";

function AdminLayout({ children }) {
  return (
    <div>
      <NavigationBar />
      <div className="container flex max-w-full">
        <Sidebar />
        <div className="content flex-1 max-w-1213 bg-background">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
