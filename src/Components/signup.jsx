import React from 'react';
import { useState } from 'react';

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    return (
        <div className='loginsignup-container'>
            <div className='loginsignup-header'>
                <div className='loginsignup-text'>{action}</div>
                <div className='loginsignup-underline'></div>
            </div>
            <div className='inputs'>
                {action === "Login" ? <div></div> : <div className='input'>
                    <input type='text' placeholder='Name' />
                </div>}
                {action === "Login" ? <div></div> : <div className='input'>
                    <input type='text' placeholder='Age' />
                </div>}
                {action === "Login" ? <div></div> : <div className='input'>
                    <input type='text' placeholder='Gender' />
                </div>}
                {action === "Login" ? <div></div> : <div className='input'>
                    <input type='text' placeholder='Contact Number' />
                </div>}
                <div className='input'>
                    <input type='email' placeholder='Example@gmail.com' />
                </div>

                <div className='input'>
                    <input type='password' placeholder='Password' />
                </div>
            </div>
            <div className="submit-contianer">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
            </div>
        </div>
    );
};

export default LoginSignup