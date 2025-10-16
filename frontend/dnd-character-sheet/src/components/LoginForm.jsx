'use client'
import { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import UserContext from "../context/UserContext";

import { VM_IP } from "../../vm_ip";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useContext(UserContext);
    
    // Handle login submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // for testing purposes, we would use a hashed password                
        console.log('Login attempt:', { username, password });

        // NOTE: Possibly replace the VM's IP inside of the fetch. 
        const response = await fetch(`${VM_IP}/login`)
    }

    async function loginAttempt(e) {
        e.preventDefault();
        try {
            const resp = await fetch(`${VM_IP}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({username, password: password})
            });

            if(resp.ok) {
                setUser({user: {username: username, password: password}});
            }
            //Dodgy for now; covers all status codes that AREN'T 200
            else {
                setUser(null);
            }

        } finally {
            setPassword("")
        }
    }

    return (
        <form id="login-form" onSubmit={loginAttempt}>
            <h2>Login</h2>

            <label htmlFor="username">Username:</label>
            <input 
                type="text" 
                id="username" 
                name="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
            />
            <br />

            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                id="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <button type="submit">Login</button>
        </form>
    )
}

