import {useEffect} from 'react'

const InboxSection = ({setActiveMenuItem, item}) => {
    
    useEffect(() => {
        
        setActiveMenuItem(item);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default InboxSection
