import { useEffect } from "react";


const SettingsSection = ({ setActiveMenuItem, item }) => {

    useEffect(() => {
        console.log(item);
        setActiveMenuItem(item);

    })
    return (
        <div>
            
        </div>
    )
}

export default SettingsSection
