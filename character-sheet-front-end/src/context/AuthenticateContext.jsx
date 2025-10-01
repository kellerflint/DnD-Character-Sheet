import { createContext, useState, useContext, useEffect } from "react";

// This context will manage login state across the app to prevent prop drilling
const AuthenticateContext = createContext(null);

export function AuthProvider({ children }) {
   const [token, setToken] = useState(null);

   // Check for JWT(token) in local storage when the app first loads
   useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
         setToken(storedToken);
      }
   }, []);

   // Function to log in and store the token
   const login = (newToken) => {
      localStorage.setItem("token", newToken);
      setToken(newToken);
   };

   // Function to log out and remove the token
   const logout = () => {
      localStorage.removeItem("token");
      setToken(null);
   };

   // The value provided to consuming components
   const value = {
      isAuthenticated: !!token,
      login,
      logout,
   };

   return <AuthenticateContext.Provider value={value}>{children}</AuthenticateContext.Provider>;
}

// Hook to use the Context in components without having to individually import useContext and the context itself
export function useAuth() {
   return useContext(AuthenticateContext);
}
