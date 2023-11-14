import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function HasAuth() {
  const location = useLocation();
  const auth = useAuth();
  return !auth?.refreshToken ? (
    <Outlet />
  ) : auth.role !== "admin" ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/welcome" state={{ from: location }} replace />
  );
}
