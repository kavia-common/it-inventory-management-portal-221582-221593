import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/auth/AuthContext";

// PUBLIC_INTERFACE
export default function ProtectedRoute({ roles = [], children }) {
  /** Guard routes based on login and authorized roles. */
  const { state } = useAuth();
  const location = useLocation();

  const isLogged = !!state?.user;
  const hasRole = roles.length === 0 || roles.some((r) => state?.roles?.includes(r));

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!hasRole) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
