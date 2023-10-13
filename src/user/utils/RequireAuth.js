import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ allowRoles }) {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = localStorage.getItem("access_token");
  return allowRoles.find((role) => role === auth?.role) && token ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
