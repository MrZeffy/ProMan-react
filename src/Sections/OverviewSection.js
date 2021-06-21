import {useEffect} from 'react'

const OverviewSection = ({ setActiveMenuItem, item }) => {

    useEffect(() => {
        console.log(item);
        setActiveMenuItem(item);

    })
    return (
        <div>
            
        </div>
    )
}

export default OverviewSection
