import React, { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase.js';
import {
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { collection, where, getDocs, updateDoc, doc, addDoc, query } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const usersQuery = query(collection(db, 'users'), where('email', '==', email));
            const querySnapshot = await getDocs(usersQuery);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                let currentLogins = userData.logins;

                if (typeof currentLogins !== "number") {
                    currentLogins = Number(currentLogins);
                    if (isNaN(currentLogins)) {
                        currentLogins = 0;
                    }
                }


                await updateDoc(doc(db, 'users', userDoc.id), {
                    logins: currentLogins + 1
                });
            } else {
                await addDoc(collection(db, 'users'), {
                    email: email,
                    logins: 1
                });
            }
            setSuccessMessage("Sign-in successful!");
            setErrorMessage("");
            navigate('/');
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
                <div className="submit-contianer">
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
