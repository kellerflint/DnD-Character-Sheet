'use client'
import { useState, useContext } from 'react';
import UserContext from "../context/UserContext";
import { VM_IP } from "../../vm_ip";

export default function EmailModifier() {
    const [email, setEmail] = useState("");
    const { setUser } = useContext(UserContext);
    
    // Handle login submission

    async function changeEmail(e) {
        e.preventDefault();
        const storedUser = localStorage.getItem('user');
        try {
            console.log(JSON.stringify(storedUser));
            console.log(JSON.parse(storedUser).id.id +" ID");
            console.log(typeof storedUser);
            const resp = await fetch(`${VM_IP}/${JSON.parse(storedUser).id.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({email: email})
            });

            if(resp.ok) {
                const data = await resp.json();

                // Redirect to user page
                window.location.href=`/user/${JSON.parse(storedUser).username}`;
            }
            else {
                console.log("Email not changed!");
            }

        } finally {
            setEmail("")
        }
    }

    return (
        <form id="email-change" onSubmit={changeEmail}>
            <h2>Change Email</h2>

            <label htmlFor="username">Email:</label>
            <input 
                type="text" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button type="submit">Submit Change</button>
        </form>
    )
}

