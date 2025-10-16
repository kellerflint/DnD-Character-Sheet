import { useState } from "react";
import { useAuth } from "./context/AuthenticateContext";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import UserDelete from "./components/UserDelete";
import ForgotPassword from "./components/ForgotPassword";
import SettingsMenu from "./components/SettingsMenu";
import CharacterSheet from "./components/CharacterSheet";

import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "./App.css";

function App() {
   const { isAuthenticated, logout, user } = useAuth();
   const [showLoginModal, setShowLoginModal] = useState(false);
   const [showRegisterModal, setShowRegisterModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showForgotPasswordModal, setShowForgotPasswordModal] =
      useState(false);

   const handleSwitchToLogin = () => {
      setShowRegisterModal(false);
      setShowForgotPasswordModal(false);
      setShowLoginModal(true);
   };

   const handleSwitchToRegister = () => {
      setShowLoginModal(false);
      setShowRegisterModal(true);
   };

   const handleSwitchToForgotPassword = () => {
      setShowLoginModal(false);
      setShowForgotPasswordModal(true);
   };

   return (
      <>
         <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
               <Typography variant="h6">D&D Character Sheet</Typography>
               {!isAuthenticated ? (
                  <Box>
                     <Button
                        color="inherit"
                        onClick={() => setShowLoginModal(true)}
                     >
                        Login
                     </Button>
                     <Button
                        color="inherit"
                        onClick={() => setShowRegisterModal(true)}
                     >
                        Register
                     </Button>
                  </Box>
               ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                     <Typography sx={{ marginRight: 2 }}>
                        Welcome, {user.username}!
                     </Typography>
                     <Button color="inherit" onClick={logout}>
                        Logout
                     </Button>

                     <SettingsMenu
                        onDeleteAccount={() => setShowDeleteModal(true)}
                     />
                  </Box>
               )}
            </Toolbar>
         </AppBar>

         <main>
            <Box sx={{ textAlign: "center", my: 2 }}>
               {isAuthenticated ? (
                  // Does not work yet
                  // If user is logged in, shows the save button
                  <Button variant="contained" color="primary">
                     Save Character
                  </Button>
               ) : (
                  <p>
                     {/* Else prompts the user to login */}
                     <i>Please log in to save your character.</i>
                  </p>
               )}
            </Box>

            <CharacterSheet />
         </main>

         <UserLogin
            open={showLoginModal}
            closeModal={() => setShowLoginModal(false)}
            switchToRegister={handleSwitchToRegister}
            switchToForgotPassword={handleSwitchToForgotPassword}
         />

         <UserRegister
            open={showRegisterModal}
            closeModal={() => setShowRegisterModal(false)}
            switchToLogin={handleSwitchToLogin}
         />

         <UserDelete
            open={showDeleteModal}
            closeModal={() => setShowDeleteModal(false)}
         />

         <ForgotPassword
            open={showForgotPasswordModal}
            closeModal={() => setShowForgotPasswordModal(false)}
            switchToLogin={handleSwitchToLogin}
         />
      </>
   );
}

export default App;
