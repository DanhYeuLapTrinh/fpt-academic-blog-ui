import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth({ allowRoles }) {
  const location = useLocation();
  const auth = useAuth()
  return (allowRoles.find((role) => role === auth?.role) && auth?.token) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/404-not-found" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}