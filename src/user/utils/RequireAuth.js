import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function RequireAuth({ allowRoles }) {
  const location = useLocation();
  const {auth} = useContext(AuthContext)
  return allowRoles.find((role) => role === auth?.role) && auth?.token ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
