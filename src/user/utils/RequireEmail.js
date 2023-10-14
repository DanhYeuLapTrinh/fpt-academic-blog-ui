import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "../context/LoginProvider";

export default function RequireEmail() {
  const location = useLocation();
  const { email } = useContext(LoginContext);

  return email ? (
    <Outlet />
  ) : (
    <Navigate to="/email-entry" state={{ from: location }} replace />
  );
}
