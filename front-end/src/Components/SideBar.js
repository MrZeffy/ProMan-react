
import MenuListItem from './MenuListItem'


// Icons
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
        iconClass: HomeIcon,
        link: '/'
    },
    {
        id: 1,
        itemTitle: 'Tracker',
        iconClass: AccessTimeIcon,
        link: '/tracker'
    },
    {
        id: 2,
        itemTitle: 'Projects',
        iconClass: FolderIcon,
        link: '/projecttracker'
    },
    {
        id: 3,
        itemTitle: 'Chats',
        iconClass: SendIcon,
        link: '/inbox'
    }
    
    
]


const settingMenu = [
    {
        id: 4,
        itemTitle: 'Settings',
        iconClass: SettingIcon,
        link: '/settings'
    },
    {
        id: 5,
        itemTitle: 'Log Out',
        iconClass: LogoutIcon,
        link: '/logout'
    }
]



const SideBar = ({activeMenuItem, setActiveMenuItem}) => {

    const updateActive = (index) => {
        
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
                                onClick={()=>updateActive(ele.id)}
                                pointTo={ele.link}/>
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
                                    onClick={() => updateActive(ele.id)} 
                                    pointTo={ele.link}/>
                            )
                        })}
                        
                    </ul>
                </div>
            </div>

            
            
        </div>
    )
}

export default SideBar
