// RequireCustomer.jsx
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireCustomer() {
  const { customer, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!customer) return <Navigate to="/login" replace />;

  return <Outlet />;
}
