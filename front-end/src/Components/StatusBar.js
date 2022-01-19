import React from 'react'
import './StatusBar.css'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

const StatusBar = () => {
    return (
        <div className="statusBarContainer">
            <div className="statusContainer">
                {/* <div className="helpContainer">
                    <HelpOutlineOutlinedIcon />
                </div>
                <div className="notificationIcon">
                    <NotificationsNoneOutlinedIcon />
                </div> */}
                <div className="userOptionsContainer">
                    
                    <div className="nameContainer">
                        User
                    </div>
                    <div className="arrowIcon">
                        <ExpandMoreOutlinedIcon />
                    </div>
                </div>
                
                <div className="userImage">
                    <img src="/userImagePlaceholder.png" alt="User placeholder"/>
                </div>
                
            </div>
        </div>
    )
}

export default StatusBar
