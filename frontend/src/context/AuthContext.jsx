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
  const admin = localStorage.getItem("adminAuth");
  const customer = localStorage.getItem("customerAuth");

  if (customer) setUser(JSON.parse(customer));
  else if (admin) setUser(JSON.parse(admin));

  setLoading(false);
}, []);


 const login = async (data) => {
  const storageKey =
    data.user.role === "admin" ? "adminAuth" : "customerAuth";

  const tokenKey =
    data.user.role === "admin" ? "adminToken" : "customerToken";

  localStorage.setItem(storageKey, JSON.stringify(data.user));
  localStorage.setItem(tokenKey, data.token);

  setUser(data.user);

  const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

  if (guestCart.length > 0 && data.user.role === "customer") {
    try {
      await api.post("/cart/merge", { items: guestCart });
      localStorage.removeItem("guestCart");
    } catch (err) {
      console.error("Cart merge failed");
    }
  }
};

  const logout = () => {
  setUser(null);

  localStorage.removeItem("adminAuth");
  localStorage.removeItem("customerAuth");
  localStorage.removeItem("adminToken");
  localStorage.removeItem("customerToken");

   localStorage.removeItem("auth");
  localStorage.removeItem("authToken");
};


  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
