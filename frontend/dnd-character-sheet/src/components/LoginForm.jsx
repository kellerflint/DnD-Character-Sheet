'use client'
import { useState } from 'react';
import RegistrationForm from './RegistrationForm';

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    // Handle login submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // for testing purposes, we would use a hashed password                
        console.log('Login attempt:', { username, password });

        // NOTE: Possibly replace the VM's IP inside of the fetch. 
        const response = await fetch(VM_IP || 'http://localhost:3001/login')
    }

    // Handle register button click
    const handleRegister = async (e) => {
        e.preventDefault();

        console.log('Navigating to registration form.')
    }
    async function loginAttempt(e) {
        e.preventDefault();
        try {
            await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({username, password: pw})
            });
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

