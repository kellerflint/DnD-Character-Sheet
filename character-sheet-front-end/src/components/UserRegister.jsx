import { useState } from "react";
import { registerUser } from "../api";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const formFields = [
   { id: "username", label: "Username", type: "text", autoFocus: true },
   { id: "firstName", label: "First Name", type: "text" },
   { id: "lastName", label: "Last Name", type: "text" },
   { id: "email", label: "Email Address", type: "email" },
   { id: "password", label: "Password", type: "password" },
];

function UserRegister({ open, closeModal, switchToLogin }) {
   const [formData, setFormData] = useState({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
   });

   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const handleChange = (event) => {
      const { id, value } = event.target;
      setFormData((prevData) => ({
         ...prevData,
         [id]: value,
      }));
   };

   const handleSubmit = (event) => {

      event.preventDefault();

      setError("");
      setSuccess("");

      setIsLoading(true);

      registerUser(formData)
         .then((data) => {
            console.log("Registration successful!", data);
            setSuccess("Success! Redirecting to login...");
            setIsLoading(false);

            setTimeout(() => {
               switchToLogin();
            }, 2000);
         })
         .catch((err) => {

            console.error("Registration failed:", err);
            setError(
               "Registration failed. This email or username may already be in use."
            );
            setIsLoading(false);
         });
   };

   return (
      <Dialog open={open} onClose={closeModal}>
         <form onSubmit={handleSubmit}>
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
               {error && (
                  <p style={{ color: "red", textAlign: "center" }}>{error}</p>
               )}
               {success && (
                  <p style={{ color: "green", textAlign: "center" }}>
                     {success}
                  </p>
               )}

               {formFields.map((field) => (
                  <TextField
                     key={field.id}
                     autoFocus={field.autoFocus || false}
                     required
                     margin="dense"
                     id={field.id}
                     label={field.label}
                     type={field.type}
                     fullWidth
                     variant="standard"
                     value={formData[field.id]}
                     onChange={handleChange}
                  />
               ))}
            </DialogContent>
            <DialogActions>
               <Button onClick={switchToLogin} color="secondary">
                  Already have an account?
               </Button>
               <Button onClick={closeModal}>Cancel</Button>
               <Box sx={{ position: "relative" }}>
                  <Button
                     type="submit"
                     variant="contained"
                     disabled={isLoading}
                  >
                     Register
                  </Button>

                  {isLoading && (
                     <CircularProgress
                        size={24}
                        sx={{
                           position: "absolute",
                           top: "50%",
                           left: "50%",
                           marginTop: "-12px",
                           marginLeft: "-12px",
                        }}
                     />
                  )}
               </Box>
            </DialogActions>
         </form>
      </Dialog>
   );
}

export default UserRegister;