import { useState, useEffect } from 'react';
import SignUpIcon from '@material-ui/icons/PersonAdd';
import { Redirect } from 'react-router';

const SignUpForm = () => {
    const [name, setName] = useState('');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpDone, setSignUpDone] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (password !== confirmPassword){
            setErrorMessage("Passwords don't match");
        }else{
            setErrorMessage('');
        }
        
        
    }, [confirmPassword, password])

    const handleSignup = (e)=>{
        e.preventDefault();
        const requestBody={
            name, email, password
        };
        
        fetch('http://localhost/signup/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'Application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            credentials: 'include',
            body: JSON.stringify(requestBody)
        }).then((res)=>res.json())
        .then((res)=>{
            console.log(res.emailExists);
            if(res.emailExists){
                
                setErrorMessage(`Email already exists.`);
            }else{
                setSignUpDone(true);
            }
        })
        .catch((err)=>{
            console.log("OOPS! something went wrong!");
        })

    }

    return (
        <form className="ourLoginForm signUpForm" onSubmit={handleSignup} >
            {(signUpDone && <Redirect to="/login"/>)}
            <h2>Sign Up</h2>
            <label htmlFor="name">Name</label>
            <input onChange={(e) => { setName(e.target.value) }} type="text" name="name" id="name" placeholder="Enter your Name" required />                
            <label htmlFor="email">Email</label>
            <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" id="email" placeholder="Enter your Email" required/>
            <label htmlFor="password">Password</label>
            <input onChange={(e) => { setPassword(e.target.value) }} type="password" name="password" id="password" placeholder="Enter your password" required/>
            <label htmlFor="confirmPassword">Confirm Password</label>            
            <input onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required />
            {(errorMessage !== '' && 
            <div className="errorText">
                <p>{errorMessage}</p>
            </div>
            )}
            <div className="loginButton signUpButton">                
                <button type="submit"><p>Sign Up</p> <SignUpIcon /></button>
            </div>
        </form>
    )
}

export default SignUpForm
