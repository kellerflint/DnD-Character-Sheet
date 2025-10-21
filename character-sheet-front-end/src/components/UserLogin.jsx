import { useAuth } from "../context/AuthenticateContext";
import { loginUser } from "../api";
import { useModalForm } from "../hooks/useModalForm";

import {
   Alert,
   Button,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Box,
   IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const initialFormState = {
   email: "",
   password: "",
};

function UserLogin({
   open,
   closeModal,
   switchToRegister,
   switchToForgotPassword,
}) {
   const { login } = useAuth();
   const { formData, setFormData, error, setError, handleClose } = useModalForm(
      initialFormState,
      closeModal
   );

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

      loginUser(formData)
         .then((data) => {
            login(data.token);
            handleClose();
         })
         .catch((err) => {
            console.error("Login failed:", err);
            setError("Login failed. Please check your email and password.");
         });
   };

   return (
      <Dialog open={open} onClose={handleClose}>
         <form onSubmit={handleSubmit}>
            <DialogTitle>
               Login
               <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                     position: "absolute",
                     right: 8,
                     top: 8,
                     color: (theme) => theme.palette.grey[500],
                  }}
               >
                  <CloseIcon />
               </IconButton>
            </DialogTitle>
            <DialogContent>
               {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                     {error}
                  </Alert>
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
                  value={formData.email}
                  onChange={handleChange}
               />
               <TextField
                  required
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="standard"
                  value={formData.password}
                  onChange={handleChange}
               />
            </DialogContent>
            <DialogActions
               sx={{ justifyContent: "space-between", padding: "16px 24px" }}
            >
               <Box>
                  <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                     Login
                  </Button>
                  <Button
                     onClick={switchToRegister}
                     color="primary"
                     sx={{ mr: 1 }}
                  >
                     Need to Register?
                  </Button>
               </Box>
               <Button onClick={switchToForgotPassword}>
                  Forgot Password?
               </Button>
            </DialogActions>
         </form>
      </Dialog>
   );
}

export default UserLogin;
