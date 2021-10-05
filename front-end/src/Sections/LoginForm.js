import React from 'react';
import LoginIcon from '@material-ui/icons/ArrowRightAlt';

const loginForm = ({handleLogin, setUsername, setPassword}) => {
    return (
        <form className="ourLoginForm" onSubmit={handleLogin} >
            <h2>Sign in</h2>
            <label htmlFor="username">Username</label>
            <input onChange={(e) => { setUsername(e.target.value) }} type="text" name="username" id="username" placeholder="Enter your username" />
            <label htmlFor="password">Password</label>
            <input onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" id="password" placeholder="Enter your password" />
            <div className="loginButton">
                <button type="submit"><p>Sign In</p> <LoginIcon /></button>
            </div>
        </form>
    )
}

export default loginForm
