// Parent Component for Login Form and Registration Form

'use client'

import { useState } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function AuthForms() {
    const [showRegistrationForm, SetShowRegistrationForm] = useState(false);

    return (
        <div>
            {showRegistrationForm ? <LoginForm/> : <RegistrationForm />}
            <button onClick={() => SetShowRegistrationForm(!showRegistrationForm)}>
                {showRegistrationForm ? "Register" : "Login"}
            </button>
        </div>
    )
}