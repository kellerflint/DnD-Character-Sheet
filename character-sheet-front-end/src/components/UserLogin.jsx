import { useState } from "react";
import { useAuth } from "../context/AuthenticateContext";
import { loginUser } from "../api";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function UserLogin({ open, closeModal, switchToRegister }) {
   const { login } = useAuth();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const handleSubmit = (event) => {
      event.preventDefault();

      setError("");

      loginUser({ email, password })
         .then((data) => {
            login(data.token);
            closeModal();
         })
         .catch((err) => {
            console.error("Login failed:", err);
            setError("Login failed. Please check your email and password.");
         });
   };

   return (
      <Dialog open={open} onClose={closeModal}>
         <form onSubmit={handleSubmit}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
               {error && (
                  <p style={{ color: "red", textAlign: "center" }}>{error}</p>
               )}

               <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
               />
               <TextField
                  required
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={switchToRegister} color="secondary">
                  Need to Register?
               </Button>
               <Button type="submit" variant="contained">
                  Login
               </Button>
               <Button onClick={closeModal}>Cancel</Button>
            </DialogActions>
         </form>
      </Dialog>
   );
}

export default UserLogin;
