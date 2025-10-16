import { useState } from "react";
import { useAuth } from "../context/AuthenticateContext";
import { deleteUser } from "../api";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

function UserDelete({ open, closeModal }) {
   const { logout } = useAuth();
   const [confirmationText, setConfirmationText] = useState("");
   const [error, setError] = useState("");

   const isConfirmed = confirmationText === "DELETE ACCOUNT";

   const handleDelete = async () => {
      if (!isConfirmed) {
         setError("You must type 'DELETE ACCOUNT' to confirm.");
         return;
      }
      setError("");

      try {
         await deleteUser();

         logout();
         closeModal();
      } catch (err) {
         console.error("Failed to delete account:", err);
         setError("Failed to delete account. Please try again later.");
      }
   };

   const handleClose = () => {
      setConfirmationText("");
      setError("");
      closeModal();
   };

   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle sx={{ color: "error.main" }}>Delete Account</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Are you certain? This action is irreversible as all data will be
               permanently deleted.
               <br />
               To confirm, please type{" "}
               <strong style={{ color: "black" }}>DELETE ACCOUNT</strong> in the
               box below.
            </DialogContentText>
            {error && (
               <Alert severity="warning" sx={{ mt: 2 }}>
                  {error}
               </Alert>
            )}
            <TextField
               autoFocus
               margin="dense"
               id="confirm-delete"
               label="Type to confirm"
               type="text"
               fullWidth
               variant="standard"
               value={confirmationText}
               onChange={(e) => setConfirmationText(e.target.value)}
            />
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
               onClick={handleDelete}
               variant="contained"
               color="error"
               disabled={!isConfirmed}
            >
               Delete My Account
            </Button>
         </DialogActions>
      </Dialog>
   );
}

export default UserDelete;
