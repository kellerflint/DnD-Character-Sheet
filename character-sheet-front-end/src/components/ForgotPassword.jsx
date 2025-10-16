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

      const questionText = securityQuestions.find(
         (q) => q.id === formData.securityQuestionId
      )?.text;

      const cleanedAnswer = formData.securityAnswer.trim().toLowerCase();

      const payload = {
         email: formData.email,
         question: questionText,
         answer: cleanedAnswer,
         newPassword: formData.newPassword,
      };

      updatePassword(payload)
         .then(() => {
            setSuccess(true);
            setTimeout(() => {
               closeModal();
               switchToLogin();
            }, 2000);
         })
         .catch((err) => {
            setError(err.response?.data?.message || "An error occurred.");
         });
   };

   return (
      <Dialog open={open} onClose={handleClose}>
         <form onSubmit={handleSubmit}>
            <DialogTitle>
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
