// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Nếu chưa đăng nhập → quay về trang login
    return <Navigate to="/login" replace />;
  }
  // Nếu đã đăng nhập → cho phép truy cập
  return <>{children}</>;
};

export default ProtectedRoute;
