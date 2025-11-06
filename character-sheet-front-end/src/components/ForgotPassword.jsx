import { updatePassword } from "../api";
import { securityQuestions } from "../utils/securityQuestions";
import { useModalForm } from "../hooks/useModalForm";

import {
   Alert,
   Button,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const initialFormState = {
   email: "",
   securityQuestionId: "",
   securityAnswer: "",
   newPassword: "",
   confirmPassword: "",
};

function ForgotPassword({ open, closeModal, switchToLogin }) {
   const {
      formData,
      setFormData,
      error,
      setError,
      success,
      setSuccess,
      handleClose,
   } = useModalForm(initialFormState, closeModal);

   const handleChange = (event) => {
      const { name, id, value } = event.target;
      const fieldName = name || id;
      setFormData((prevData) => ({
         ...prevData,
         [fieldName]: value,
      }));
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      setError("");
      setSuccess("");

      if (formData.newPassword !== formData.confirmPassword) {
         setError("Passwords do not match.");
         return;
      }

      const cleanedAnswer = formData.securityAnswer.trim().toLowerCase();

      const payload = {
         email: formData.email,
         securityAnswer: cleanedAnswer,
         newPassword: formData.newPassword,
      };

      updatePassword(payload)
         .then(() => {
            setSuccess(true);

            const isTest =
               import.meta.env.MODE === "test" ||
               import.meta.env.VITE_TEST === "true";

            if (isTest) {
               setTimeout(() => {
                  closeModal();
                  switchToLogin();
               }, 0);
               return;
            }

            setTimeout(() => {
               closeModal();
               switchToLogin();
            }, 2000);
         })
         .catch(() => setError("Failed to update password"));
   };

   return (
      <Dialog open={open} onClose={handleClose}>
         <form onSubmit={handleSubmit}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
               <img
                  src="/dice2.png"
                  alt="Spinning D&D Die"
                  className="dice-spin"
                  style={{ width: 24, height: 24, marginRight: 8 }}
               />
               Reset Password
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
               {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                     Password updated successfully! Redirecting to login...
                  </Alert>
               )}
               {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                     {error}
                  </Alert>
               )}

               {!success && (
                  <>
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
                        inputProps={{ "data-testid": "email" }}
                     />

                     <FormControl
                        fullWidth
                        required
                        margin="dense"
                        variant="standard"
                     >
                        <InputLabel id="security-question-label">
                           Security Question
                        </InputLabel>
                        <Select
                           labelId="security-question-label"
                           id="securityQuestionId"
                           name="securityQuestionId"
                           value={formData.securityQuestionId}
                           onChange={handleChange}
                           label="Security Question"
                           inputProps={{ "data-testid": "securityQuestionId" }}
                        >
                           {securityQuestions.map((q) => (
                              <MenuItem key={q.id} value={q.id}>
                                 {q.text}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>

                     <TextField
                        required
                        margin="dense"
                        id="securityAnswer"
                        label="Security Answer"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.securityAnswer}
                        onChange={handleChange}
                        inputProps={{ "data-testid": "securityAnswer" }}
                     />

                     <TextField
                        required
                        margin="dense"
                        id="newPassword"
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={formData.newPassword}
                        onChange={handleChange}
                        inputProps={{ "data-testid": "newPassword" }}
                     />

                     <TextField
                        required
                        margin="dense"
                        id="confirmPassword"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        inputProps={{ "data-testid": "confirmPassword" }}
                     />
                  </>
               )}
            </DialogContent>
            <DialogActions>
               {success ? (
                  <Button onClick={switchToLogin} variant="contained">
                     Login
                  </Button>
               ) : (
                  <>
                     <Button type="submit" variant="contained">
                        Update Password
                     </Button>
                  </>
               )}
            </DialogActions>
         </form>
      </Dialog>
   );
}

export default ForgotPassword;