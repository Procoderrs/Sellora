import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequireAdmin() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // or a spinner

  if (!user) return <Navigate to="/" />; // not logged in
  if (user.role !== "admin") return <Navigate to="/" />; // not admin
console.log(user);
  return <Outlet />;
}
