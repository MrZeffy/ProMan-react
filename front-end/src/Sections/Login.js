import './Login.css';
import { useState } from 'react';

import {Link, Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import { useUserInfo, useUpdateUserInfo } from '../Contexts/UserInfo';
import SignUpForm from './SignUpForm';



const Login = ({signUp}) => {
    
    
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
                            Welcome {(!signUp && "Home")} :&#41;
                        </div>
                        {(!signUp) ? 
                        (<div className="noAccount">
                            <p>Don't have an account?</p>
                            <p><Link to="/signup">Register Now!</Link></p>
                        </div>)
                        : (<div className="noAccount">
                            <p>Already have an account?</p>
                            <p><Link to="/login">Login Now!</Link></p>
                        </div>)}
                        
                    </div>
                </div>
                <div className="loginForm">
                    {(!signUp)?<LoginForm setPassword={setPassword} setUsername={setUsername} handleLogin={handleLogin}/>:(<SignUpForm></SignUpForm>)}
                </div>
            </div>
        </div>
    )
}

export default Login
