import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// This context will manage login state across the app to prevent prop drilling
const AuthenticateContext = createContext(null);

// Updated to include user details on login

export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);

   // Check for JWT(token) in local storage when the app first loads
   useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
         try {
            const decodedUser = jwtDecode(storedToken);
            setUser(decodedUser);
         } catch (error) {
            console.error("Failed to decode token:", error);
            // Clear invalid token
            localStorage.removeItem("token");
         }
      }
   }, []);

   // Function to log in and store the token
   const login = (newToken) => {
      const decodedUser = jwtDecode(newToken);
      localStorage.setItem("token", newToken);
      setUser(decodedUser);
   };

   // Function to log out and remove the token
   const logout = () => {
      localStorage.removeItem("token");
      setUser(null);
   };

   // The info provided to components using the context
   const value = {
      // Is the user logged in
      isAuthenticated: !!user,
      // User details
      user,
      // Login and Logout functions
      login,
      logout,
   };

   return (
      <AuthenticateContext.Provider value={value}>
         {children}
      </AuthenticateContext.Provider>
   );
}

// Hook to use the Context in components without having to individually import useContext and the context itself
export function useAuth() {
   return useContext(AuthenticateContext);
}
