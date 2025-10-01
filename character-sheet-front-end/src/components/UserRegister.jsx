import { useState } from "react";
import { registerUser } from "../api";

// MUI Component Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// An array to define the configuration for each form field.
const formFields = [
   { id: "username", label: "Username", type: "text", autoFocus: true },
   { id: "firstName", label: "First Name", type: "text" },
   { id: "lastName", label: "Last Name", type: "text" },
   { id: "email", label: "Email Address", type: "email" },
   { id: "password", label: "Password", type: "password" },
];

function UserRegister({ open, closeModal, switchToLogin }) {
   // Holds all form data
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

   // Updates the state for any field so there doesn't need to be 5 separate text fields
   const handleChange = (event) => {
      const { id, value } = event.target;
      setFormData((prevData) => ({
         ...prevData,
         [id]: value,
      }));
   };

   // Handles account creation form submission
   const handleSubmit = (event) => {
      // Stop the page from reloading
      event.preventDefault();

      // Clear any previous messages
      setError("");
      setSuccess("");

      // Show loading indicator
      setIsLoading(true);

      // Call the register function with the complete user data object from our state
      registerUser(formData)
         .then((data) => {
            // If the registration works
            console.log("Registration successful!", data);
            setSuccess("Success! Redirecting to login...");
            setIsLoading(false);

            // Wait 2 seconds before redirecting to login modal
            setTimeout(() => {
               switchToLogin();
            }, 2000);
         })
         .catch((err) => {
            // If the registration fails
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

                  {/* Show a loading spinner inside the button when submitting */}
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