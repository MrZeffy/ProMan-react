import React from 'react'
import MenuListItem from './MenuListItem'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FolderIcon from '@material-ui/icons/FolderOutlined'
import SendIcon from '@material-ui/icons/Send'


// folder-open

const menuItems = [
    {
        itemTitle: 'Overview',
        iconClass: HomeIcon
    },
    {
        itemTitle: 'Tracker',
        iconClass: AccessTimeIcon
    },
    {
        itemTitle: 'Projects',
        iconClass: FolderIcon
    },
    {
        itemTitle: 'Chats',
        iconClass: SendIcon
    }
]

const SideBar = () => {
    return (
        <div className="sideBarContainer">

            <div className="sideBar"> 
                <div className="logoContainer">                    
                    <p><a href="/" className="logoLink">ProMan</a></p>
                </div>

                <div className="menuContainer">
                    <ul className="menuList">
                        {menuItems.map((ele, index) => {
                            return (
                                <MenuListItem key={index} iconClass={ele.iconClass} itemTitle={ele.itemTitle} />
                            )
                        })}
                    </ul>
                </div>
            </div>

            
            
        </div>
    )
}

export default SideBar
