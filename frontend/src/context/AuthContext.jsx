import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth + cart on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("auth");

    if (savedUser) setUser(JSON.parse(savedUser));

    setLoading(false);
  }, []);

  // Persist cart
 

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("auth", JSON.stringify(data.user));
    localStorage.setItem("authToken", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
    
  };

  
  

  

  return (
    <AuthContext.Provider
      value={{
        user,
       
        loading,
        login,
        logout,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
