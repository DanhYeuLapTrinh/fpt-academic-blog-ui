import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ allowRoles }) {
  const location = useLocation();
  const auth = JSON.parse(localStorage.getItem("auth"))
  return (allowRoles.find((role) => role === auth?.role) && auth?.token) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}