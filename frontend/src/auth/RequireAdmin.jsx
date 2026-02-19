// RequireAdmin.jsx
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAdmin() {
  const { admin, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!admin) return <Navigate to="/login" replace />;

  return <Outlet />;
}
