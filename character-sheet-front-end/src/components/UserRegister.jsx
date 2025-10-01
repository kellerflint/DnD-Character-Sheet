import { useState } from "react";
import { registerUser } from "../api";

function UserRegister({ switchToLogin}) {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   // Handles account creation form submission
   const handleSubmit = (event) => {

      // Stop the page from reloading
      event.preventDefault();

      // Clear any previous messages
      setError("");
      setSuccess("");

      // Call the register function
      registerUser({ email, password })
         .then((data) => {
            // If the registration works
            console.log("Registration successful!", data);
            setSuccess("Registration successful! Redirecting to login...");

            // Wait 2 seconds before redirecting login modal
            setTimeout(() => {
               switchToLogin();
            }, 2000);
         })
         .catch((err) => {
            // If the registration fails
            console.error("Registration failed:", err);
            setError("Registration failed. This email may already be in use.");
         });
   };

   return (
      <div>
         <h2>Register</h2>
         <form onSubmit={handleSubmit}>
            <input
               type="email"
               value={email}
               onChange={(event) => setEmail(event.target.value)}
               placeholder="Enter an Email"
               required
            />
            <br />
            <input
               type="password"
               value={password}
               onChange={(event) => setPassword(event.target.value)}
               placeholder="Enter aPassword"
               required
            />
            <br />
            <button type="submit">Register</button>
         </form>

         {error && <p style={{ color: "red" }}>{error}</p>}
         {success && <p style={{ color: "green" }}>{success}</p>}
         <p>
            Already have an account? <Link to="/login">Login here</Link>
         </p>
      </div>
   );
}

export default UserRegister;
