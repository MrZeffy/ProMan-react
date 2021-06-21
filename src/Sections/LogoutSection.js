import {useEffect} from 'react'

const LogoutSection = ({ setActiveMenuItem, item }) => {

    useEffect(() => {
        console.log(item);
        setActiveMenuItem(item);

    })
    return (
        <div>
            
        </div>
    )
}

export default LogoutSection
