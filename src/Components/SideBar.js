import {useState} from 'react'
import MenuListItem from './MenuListItem'
import HomeIcon from '@material-ui/icons/HomeOutlined'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FolderIcon from '@material-ui/icons/FolderOutlined'
import SendIcon from '@material-ui/icons/Send'
import SettingIcon from '@material-ui/icons/SettingsOutlined'
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined'


// folder-open

const menuItems = [
    {
        id: 0,
        itemTitle: 'Overview',
        iconClass: HomeIcon
    },
    {
        id: 1,
        itemTitle: 'Tracker',
        iconClass: AccessTimeIcon
    },
    {
        id: 2,
        itemTitle: 'Projects',
        iconClass: FolderIcon
    },
    {
        id: 3,
        itemTitle: 'Chats',
        iconClass: SendIcon
    }
    
    
]


const settingMenu = [
    {
        id: 4,
        itemTitle: 'Settings',
        iconClass: SettingIcon
    },
    {
        id: 5,
        itemTitle: 'Log Out',
        iconClass: LogoutIcon
    }
]



const SideBar = () => {

    

    const [activeMenuItem, setActiveMenuItem] = useState(0);


    const updateActive = (index) => {
        console.log('updating');
        setActiveMenuItem(index);
    }

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
                                <MenuListItem key={index} iconClass={ele.iconClass}
                                itemTitle={ele.itemTitle} 
                                activeItem={ele.id===activeMenuItem}
                                onClick={()=>updateActive(ele.id)}/>
                            )
                        })}
                    </ul>
                </div>
                <div className="bottomMenu">
                    <ul className="menuList bottomMenuList">
                        
                        {settingMenu.map((ele, index)=>{
                            return (
                                <MenuListItem key={index} iconClass={ele.iconClass}
                                    itemTitle={ele.itemTitle}
                                    activeItem={ele.id === activeMenuItem}
                                    onClick={() => updateActive(ele.id)} />
                            )
                        })}
                        
                    </ul>
                </div>
            </div>

            
            
        </div>
    )
}

export default SideBar
