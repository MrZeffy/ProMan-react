import './Login.css';
import { useState } from 'react';

import {Link, Redirect} from 'react-router-dom';
import LoginIcon from '@material-ui/icons/ArrowRightAlt';
import { useUserInfo, useUpdateUserInfo } from '../Contexts/UserInfo';



const Login = () => {
    
    
    // const [loggedIn, setLoggedIn] = useState(null);
    const loggedIn = useUserInfo();
    
    const setLoggedIn = useUpdateUserInfo();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();


        fetch('http://localhost:3001/login/', {
            method: 'POST',
            headers: {'Content-type': 'application/json',
            'Accept': 'Application/json',
           'Access-Control-Allow-Origin': 'http://localhost:3000'},
            credentials: 'include',
            body: JSON.stringify({username: username, password: password})
        })
        .then((data)=>data.json())
        .then((data)=>{
            console.log("login successful", data);
            return fetch('http://localhost:3001/getUser/', {credentials: 'include'})
        })
        .then((data)=>data.json())
        .then((data)=>{
            console.log("Data from second request", data);
            if(data.username){
                setLoggedIn({username: data.username});
            }
        })
        .catch((err)=>{
            console.log("Error", err)
        })
    }


    return (
        <div className="loginPage">
            {(loggedIn && <Redirect to="/"/>)}
            <div className="loginSectionContainer">
                <div className="formImageContainer">
                    <div className="imageContentContainer">
                        <div className="titleText">
                            <h2>
                                ProMan
                            </h2>
                        </div>   
                        <div className="welcomeHeading">
                            Welcome Home :&#41;
                        </div>
                        <div className="noAccount">
                            <p>Don't have an account?</p>
                            <p><Link to="/signup">Register Now!</Link></p>
                        </div>
                    </div>
                </div>
                <div className="loginForm">
                    <form className="ourLoginForm" onSubmit={handleLogin} >
                        <h2>Sign in</h2>
                        <label htmlFor="username">Username</label>
                        <input onChange={(e)=>{setUsername(e.target.value)}} type="text" name="username" id="username" placeholder="Enter your username"/>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="password" placeholder="Enter your password"/>
                        <div className="loginButton">
                            <button type="submit"><p>Sign In</p> <LoginIcon /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
