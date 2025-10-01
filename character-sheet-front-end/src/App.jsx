import { useState } from "react";
import { useAuth } from "./context/AuthenticateContext";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister";
import "./App.css";

function App() {
   const { isAuthenticated, logout } = useAuth();
   const [showLoginModal, setShowLoginModal] = useState(false);
   const [showRegisterModal, setShowRegisterModal] = useState(false);

   return (
      <>
         <header>
            {!isAuthenticated ? (
               <div>
                  <button onClick={() => setShowLoginModal(true)}>Login</button>
                  <button onClick={() => setShowRegisterModal(true)}>
                     Register
                  </button>
               </div>
            ) : (
               <button onClick={logout}>Logout</button>
            )}
         </header>

         <main>
            <h1>D&D Character Sheet</h1>
            <p>Character Name: Loginius Testingomar</p>

            {isAuthenticated ? (
               <button>Save Character</button>
            ) : (
               <p>
                  <i>Please log in to save your character.</i>
               </p>
            )}
         </main>

         {showLoginModal && (
            <UserLogin closeModal={() => setShowLoginModal(false)} />
         )}
         {showRegisterModal && (
            <UserRegister closeModal={() => setShowRegisterModal(false)} />
         )}
      </>
   );
}

export default App;
