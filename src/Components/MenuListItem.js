import React from 'react'


const MenuListItem = ({itemTitle, iconClass}) => {
    const OurIcon = iconClass;
    return (

       <li className="menuItem">
           <OurIcon className="menuIcon"/>
           {itemTitle}
       </li>
    )
}

export default MenuListItem
