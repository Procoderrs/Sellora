import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireCustomer() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!user) return <Navigate to="/" />;
  if (user.role !== "customer")
    return <Navigate to="/admin/dashboard" />;

  return <Outlet />;
}
