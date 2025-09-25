import { useState, useEffect } from "react";
import { getApiCheck } from "./api/index";
import "./App.css";

function App() {
   const [message, setMessage] = useState("");

   useEffect(() => {
      getApiCheck()
         .then((data) => {
            setMessage(data);
         })
         .catch((err) => {
            console.error(err);
            setMessage("Failed to connect to the backend.");
         });
   }, []);

   return (
      <>
         <h1>Vite + React</h1>
         <div className="card">
            <p>
               <strong>{message}</strong>
            </p>
         </div>
      </>
   );
}

export default App;
