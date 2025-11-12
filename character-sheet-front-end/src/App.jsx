import { useState, useEffect } from "react";
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

const backgroundImages = [
   "/dnd-wall1.jpg",
   "/dnd-wall2.jpg",
   "/dnd-wall3.jpg",
];

function App() {
   const { isAuthenticated, logout, user } = useAuth();
   const [showLoginModal, setShowLoginModal] = useState(false);
   const [showRegisterModal, setShowRegisterModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showForgotPasswordModal, setShowForgotPasswordModal] =
      useState(false);
   const [currentBackground, setCurrentBackground] = useState("");

   useEffect(() => {
      const index = Math.floor(Math.random() * backgroundImages.length);
      setCurrentBackground(backgroundImages[index]);
   }, []);

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
      <Box
         sx={{
            minHeight: "100vh",
            width: "100vw",
            overflowX: "hidden",
            textAlign: "center",
            backgroundImage: `url(${currentBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#1a1a1a",
            color: "#f5f5f5",
            position: "relative",
            overflow: 'auto',
         }}
      >
         <Box
            sx={{
               position: "absolute",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundColor: "rgba(0, 0, 0, 0.5)",
               zIndex: 1,
            }}
         />

         <Box sx={{ position: 'relative', zIndex: 2, pb: 4 }}>
            <AppBar
               position="static"
               elevation={0}
               sx={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
            >
               <Toolbar sx={{ justifyContent: "space-between" }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                     <img
                        src="/dice3.png"
                        alt="Spinning Die"
                        className="dice-spin"
                     />
                     <Typography variant="h6">D&D Character Sheet</Typography>
                  </Box>
                  {isAuthenticated ? (
                     <Button variant="contained" color="primary">
                        Save Character
                     </Button>
                  ) : (
                     <p style={{ color: '#c5b358', margin: 0 }}>
                        <i>Please log in to save your character.</i>
                     </p>
                  )}
                  {!isAuthenticated ? (
                     <Box>
                        <Button
                           color="primary"
                           onClick={() => setShowLoginModal(true)}
                           data-cy="open-login-modal"
                        >
                           Login
                        </Button>
                        <Button
                           color="primary"
                           onClick={() => setShowRegisterModal(true)}
                           data-cy="open-register-modal"
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

                        <SettingsMenu onDeleteAccount={() => setShowDeleteModal(true)} />
                     </Box>
                  )}
               </Toolbar>
            </AppBar>

            <main>
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
         </Box>
      </Box>
   );
}

export default App;