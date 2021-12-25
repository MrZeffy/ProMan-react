import {useEffect} from 'react';
import LoggingOutGif from './loading.gif';
import { useUpdateUserInfo } from '../Contexts/UserInfo';

const LogoutSection = ({ setActiveMenuItem, item }) => {


    const setLoggedIn = useUpdateUserInfo();

    useEffect(() => {
        setActiveMenuItem(item);    
        fetch('http://localhost/logout', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'Application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            credentials: 'include'}).then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            if(res.status === 0){
                setLoggedIn(null);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    })

    const sectionStyles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '90vh',        
    }

    const imageStyles = {
        width: '50px',
        height: '50px'
    }

    return (
        <div className="logOutSection" style={sectionStyles}>
            
            <p style={{textAlign: 'center', fontSize: '1.2em'}}>
                Logging out...
            </p>
            <div className="logOutGifContainer">
                <img style={imageStyles} src={LoggingOutGif} alt="logging out" />
            </div>
        </div>
    )
}

export default LogoutSection
