import {useEffect} from 'react'

const TimeTracker = ({ setActiveMenuItem, item }) => {

    useEffect(() => {
        console.log(item);
        setActiveMenuItem(item);

    })
    return (
        <div>
            
        </div>
    )
}

export default TimeTracker
