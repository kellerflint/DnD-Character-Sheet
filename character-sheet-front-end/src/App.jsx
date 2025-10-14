import { useState } from "react";
import { useAuth } from "./context/AuthenticateContext";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import UserDelete from "./components/UserDelete";
import SettingsMenu from "./components/SettingsMenu";

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

   const handleSwitchToLogin = () => {
      setShowRegisterModal(false);
      setShowLoginModal(true);
   };

   const handleSwitchToRegister = () => {
      setShowLoginModal(false);
      setShowRegisterModal(true);
   };

   return (
      <>
         <AppBar position="static">
            <Toolbar>
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
                        onClick={() => setShowDeleteModal(true)}
                     />
                  </Box>
               )}
            </Toolbar>
         </AppBar>

         <main>
            <h1>D&D Character Sheet</h1>
            {/* Hardcoded for now until character creation is implemented */}
            <p>Character Name: Loginius Testingomar</p>

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
         </main>

         <UserLogin
            open={showLoginModal}
            closeModal={() => setShowLoginModal(false)}
            switchToRegister={handleSwitchToRegister}
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
      </>
   );
}

export default App;