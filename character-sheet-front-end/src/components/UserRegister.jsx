import { registerUser } from "../api";
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
   CircularProgress,
   Box,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   FormHelperText,
   IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const formFields = [
   { id: "username", label: "Username", type: "text", autoFocus: true },
   { id: "firstName", label: "First Name", type: "text" },
   { id: "lastName", label: "Last Name", type: "text" },
   { id: "email", label: "Email Address", type: "email" },
   { id: "password", label: "Password", type: "password" },
];

const initialFormState = {
   username: "",
   firstName: "",
   lastName: "",
   email: "",
   password: "",
   securityQuestionId: "",
   securityAnswer: "",
};

function UserRegister({ open, closeModal, switchToLogin }) {
   const {
      formData,
      setFormData,
      error,
      setError,
      success,
      setSuccess,
      isLoading,
      setIsLoading,
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

      if (!formData.securityQuestionId) {
         setError("Please select a security question.");
         return;
      }
      if (!formData.securityAnswer.trim()) {
         setError("Please provide a security answer.");
         return;
      }

      setIsLoading(true);

      const questionText = securityQuestions.find(
         (q) => q.id === formData.securityQuestionId
      )?.text;

      const payload = {
         username: formData.username,
         firstName: formData.firstName,
         lastName: formData.lastName,
         email: formData.email,
         password: formData.password,
         securityQuestion: questionText,
         securityAnswer: formData.securityAnswer.trim().toLowerCase(),
      };

      registerUser(payload)
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
      <Dialog open={open} onClose={handleClose}>
         <form onSubmit={handleSubmit}>
            <DialogTitle>
               Register
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
               {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                     {success}
                  </Alert>
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
                  <FormHelperText>
                     Choose a question you’ll remember (But not easily
                     guessable).
                  </FormHelperText>
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
            </DialogContent>
            <DialogActions>
               <Button onClick={switchToLogin} color="secondary">
                  Already have an account?
               </Button>
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
