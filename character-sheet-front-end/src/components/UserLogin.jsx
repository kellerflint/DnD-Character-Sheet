import { useState } from "react";
import { useAuth } from "../context/AuthenticateContext";
import { loginUser } from "../api";

function UserLogin({ closeModal }) {

   const { login } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   // Handles login form submission
   const handleSubmit = (event) => {

      // Stop the page from reloading
      event.preventDefault();

      // Clear any previous errors
      setError("");

      // Calls the login function
      loginUser({ email, password })
         .then((data) => {
            // If the login works
            login(data.token);
            closeModal();
         })
         .catch((err) => {
            // If the login fails
            console.error("Login failed:", err);
            setError("Login failed. Please check your email and password.");
         });
   };

   return (
      <div>
         <h2>Login</h2>
         <form onSubmit={handleSubmit}>
            <input
               type="email"
               value={email}
               onChange={(event) => setEmail(event.target.value)}
               placeholder="Enter Your Email"
            />
            <br />
            <input
               type="password"
               value={password}
               onChange={(event) => setPassword(event.target.value)}
               placeholder="Enter Your Password"
            />
            <br />
            <button type="submit">Login</button>
         </form>
         {error && <p style={{ color: "red" }}>{error}</p>}
         <p>
            Don't have an account? <Link to="/register">Register here</Link>
         </p>
      </div>
   );
}

export default UserLogin;
