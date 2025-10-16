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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const securityQuestions = [
   { id: "pet", text: "What is the name of your first pet?" },
   { id: "school", text: "What elementary school did you attend?" },
   { id: "city", text: "In what city were you born?" },
   { id: "car", text: "What was the model of your first car?" },
];

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
      securityQuestionId: "",
      securityAnswer: ""
   });

   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   const [isLoading, setIsLoading] = useState(false);

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

      const securityInfo = `${formData.securityQuestionId}:${formData.securityAnswer.trim().toLowerCase()}`;
      formData.securityAnswer = securityInfo;

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
               <FormControl fullWidth required margin="dense" variant="standard">
                  <InputLabel id="security-question-label">Security Question</InputLabel>
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
                  <FormHelperText>Choose a question you’ll remember (not easily guessable).</FormHelperText>
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