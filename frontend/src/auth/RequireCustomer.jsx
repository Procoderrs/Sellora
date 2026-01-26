import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function RequireCustomer() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== "customer")
    return <Navigate to="/admin/dashboard" replace />;

  return <Outlet />;
}
