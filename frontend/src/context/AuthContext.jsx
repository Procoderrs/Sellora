import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api"; // make sure api is imported

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  const login = async (data) => {
    // 1️⃣ Set user in state and localStorage
    setUser(data.user);
    localStorage.setItem("auth", JSON.stringify(data.user));
    localStorage.setItem("authToken", data.token);

    // 2️⃣ Merge guest cart if exists
    const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

    if (guestCart.length > 0) {
      try {
        // Send guest cart to backend merge API
        await api.post("/cart/merge", { items: guestCart });

        // Clear guest cart from localStorage
        localStorage.removeItem("guestCart");
      } catch (err) {
        console.error("Cart merge failed:", err.response?.data || err.message);
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
