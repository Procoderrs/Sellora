import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAdmin({ children }) {
  const { isAdmin,loading } = useAuth();
  if(loading) return null;
  return isAdmin ? children : <Navigate to="/login" />;
}
