'use client'

import { useState } from 'react';

import { VM_IP } from "../../vm_ip";

export default function RegistrationForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Handle form submission
    const handle = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Client-side validation
    if (!username || !password || !email) {
        setError("All fields are required");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }

    if (password.length < 8) {
        setError("Password must be at least 8 characters long");
        return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
    }

    try {
        // Send registration data to your backend API
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password, // Backend should hash this before storing
                email
            })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            // Handle errors from backend (e.g., username/email already exists)
            setError(data.message || "Registration failed");
            return;
        }
        
        // Success!
        setSuccess(true);
        console.log('Registration successful:', data);
        
        // Optional: Redirect to login or auto-login
        // window.location.href = '/login';
        
    } catch (err) {
        setError("Network error. Please try again.");
        console.error('Registration error:', err);
    }
    };

    // Handle navigation back to login
    const handleBackToLogin = (e) => {
    e.preventDefault();
    // Navigate back to login form
    console.log('Navigate back to login');
    };

    if (success) {
        return (
            <div id="registration-success">
                <h2>Registration Successful!</h2>
                <p>Your account has been created.</p>
                <button onClick={handleBackToLogin}>Go to Login</button>
            </div>
        );
    }
    async function loginAttempt(e) {
        e.preventDefault();
        try {
            await fetch(`${VM_IP}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({username, password: password})
            });
        } finally {
            setPassword("")
        }
    }
    return (
        <form id="registration-form" onSubmit={handle}>
            <h2>Register</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <label htmlFor="username">Username:</label>
            <input 
                type="text" 
                id="username" 
                name="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                maxLength={50} // Matches VARCHAR(50) in schema
                required
            />
            <br />
            
            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                maxLength={100} // Matches VARCHAR(100) in schema
                required
            />
            <br />
            
            <label htmlFor="password">Password:</label>
            <input 
                type="password" 
                id="password" 
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br />
            
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <br />
            
            <button type="submit">Register</button>
        </form>
    )
}