'use client'
import { useState, useContext } from 'react';
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
                const data = await resp.json();

                setUser({
                    id: data.user.id,
                    username: data.user.username,
                    email: data.user.email
                });
                
                // Store in localStorage for persistence
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect to user page
                window.location.setItem(`/user/${data.user.username}`);
            }
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

