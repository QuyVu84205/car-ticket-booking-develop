import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function RequireAdmin({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // chưa đăng nhập → mời login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (user.role !== "admin") {
    // đăng nhập nhưng không phải admin → chặn
    return <Navigate to="/home" replace />;
  }
  return children;
}
