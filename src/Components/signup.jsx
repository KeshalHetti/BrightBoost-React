import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase.js';
import {
    signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccessMessage("Sign-in successful!");
            setErrorMessage("");
        } catch (err) {
            setSuccessMessage("");
            setErrorMessage("Invalid Credentials. Please Try Again!");
            console.error(err);
        }
    };

    return (
        <div className='login-boxcontainer'>
            <div className='login-container'>
                <div className='login-header'>
                    <div className='login-text'>Login</div>
                    <div className='login-underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <input type='email' placeholder='Example@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='input'>
                        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="submit-container">
                    <button className="submit" onClick={signIn}>
                        Login
                    </button>
                </div>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>
    );
};

export default Login;
