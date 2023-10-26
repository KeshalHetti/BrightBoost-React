import React from 'react';

const Login = () => {
    return (
        <div className='login-boxcontainer'>
            <div className='login-container'>
                <div className='login-header'>
                    <div className='login-text'>Login</div>
                    <div className='login-underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <input type='email' placeholder='Example@gmail.com' />
                    </div>
                    <div className='input'>
                        <input type='password' placeholder='Password' />
                    </div>
                </div>
                <div className="submit-container">
                    <button className="submit">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
