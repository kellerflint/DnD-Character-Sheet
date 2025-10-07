import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthenticateContext = createContext(null);

export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
         try {
            const decodedUser = jwtDecode(storedToken);
            setUser(decodedUser);
         } catch (error) {
            console.error("Failed to decode token:", error);
            localStorage.removeItem("token");
         }
      }
   }, []);

   const login = (newToken) => {
      const decodedUser = jwtDecode(newToken);
      localStorage.setItem("token", newToken);
      setUser(decodedUser);
   };

   const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
   };

   const value = {
      isAuthenticated: !!user,
      user,
      login,
      logout,
   };

   return (
      <AuthenticateContext.Provider value={value}>
         {children}
      </AuthenticateContext.Provider>
   );
}

export function useAuth() {
   return useContext(AuthenticateContext);
}
