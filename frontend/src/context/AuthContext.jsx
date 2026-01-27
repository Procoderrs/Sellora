import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = async (data) => {
    setUser(data.user);
    localStorage.setItem("auth", JSON.stringify(data.user));
    localStorage.setItem("authToken", data.token);

    const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

    if (guestCart.length) {
      try {
        await api.post("/cart/merge", { items: guestCart });
        localStorage.removeItem("guestCart");
      } catch (err) {
        console.error("Cart merge failed", err);
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
