/** @format */

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * ProtectedRoute - Wraps routes that require authentication.
 * @param {object} props
 * @param {React.ReactNode} props.children - The protected content
 * @param {number|null} props.requiredRole - 0 = Patient, 1 = Hospital. null = any authenticated user
 */
export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, role } = useAuth();
  const token = localStorage.getItem("authToken");

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/LogIn" replace />;
  }

  // Role mismatch
  if (requiredRole !== null && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};
