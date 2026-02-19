import { createContext, useContext, useEffect, useState } from "react";
import api from '../api/api'

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved admin and customer from localStorage
    const savedAdmin = localStorage.getItem("adminAuth");
    const savedCustomer = localStorage.getItem("customerAuth");

    if (savedAdmin) setAdmin(JSON.parse(savedAdmin));
    if (savedCustomer) setCustomer(JSON.parse(savedCustomer));

    setLoading(false);
  }, []);

  const login = async (data) => {
    if (data.user.role === "admin") {
      setAdmin(data.user);
      localStorage.setItem("adminAuth", JSON.stringify(data.user));
      localStorage.setItem("adminToken", data.token);
    } else {
      setCustomer(data.user);
      localStorage.setItem("customerAuth", JSON.stringify(data.user));
      localStorage.setItem("customerToken", data.token);

      // Merge guest cart for customer only
      const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      if (guestCart.length > 0) {
        try {
          await api.post("/cart/merge", { items: guestCart });
          localStorage.removeItem("guestCart");
        } catch (err) {
          console.error("Cart merge failed:", err.response?.data || err.message);
        }
      }
    }
  };

  const logout = (role) => {
    if (role === "admin") {
      setAdmin(null);
      localStorage.removeItem("adminAuth");
      localStorage.removeItem("adminToken");
    } else if (role === "customer") {
      setCustomer(null);
      localStorage.removeItem("customerAuth");
      localStorage.removeItem("customerToken");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        customer,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
