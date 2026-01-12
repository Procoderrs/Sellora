import { createContext, useContext, useEffect, useState } from "react";

// Named export
export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Named export AuthProvider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("auth", JSON.stringify(data.user));
    localStorage.setItem("authToken", data.token);
    console.log(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
