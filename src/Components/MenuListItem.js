import React from 'react'


const MenuListItem = ({itemTitle, iconClass, activeItem, onClick}) => {
    const OurIcon = iconClass;
    return (

       <li className={`menuItem ${activeItem?'menuItemActive':''}`} onClick={onClick}>
            <OurIcon className="menuIcon" />
            {itemTitle}
       </li> 
       
    )
}

export default MenuListItem
