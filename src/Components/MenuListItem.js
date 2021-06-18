import React from 'react'
import { Link } from 'react-router-dom';


const MenuListItem = ({itemTitle, iconClass, activeItem, onClick, pointTo}) => {
    const OurIcon = iconClass;
    return (

       <li className={`menuItem ${activeItem?'menuItemActive':''}`} onClick={onClick}>
            
            <Link to={pointTo}>
                <div className="menuItemDataContainer">
                <OurIcon className="menuIcon" />
                {itemTitle}
                </div>
            </Link>
       </li> 
       
    )
}

export default MenuListItem
