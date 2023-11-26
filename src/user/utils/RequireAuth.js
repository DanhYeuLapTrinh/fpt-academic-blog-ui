import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowRoles }) {
  const location = useLocation();
  const auth = useAuth();
  return allowRoles.find((role) => role === auth?.role) &&
    auth?.refreshToken ? (
    <Outlet />
  ) : auth?.role === "admin" ? (
    <Navigate to="/welcome" state={{ from: location }} replace />
  ) : auth?.refreshToken ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
