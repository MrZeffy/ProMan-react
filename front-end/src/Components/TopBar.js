import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { useEffect } from 'react';

const TopBar = ({projects, showFilterMenu, setshowFilterMenu, setcurrentFilter,
                currentFilter}) => {

    useEffect(() => {
        console.log(projects);
        return () => {
            
        }
    },[projects]);
    return (
        <div className="headingSection">
            <div className="headingContainer">
                <h2>To Do App</h2>
            </div>

            <div className="filterContainer">
                <button type="button" className="buttonForFilter"
                    onClick={() => setshowFilterMenu(!showFilterMenu)}
                    onBlur={() => setshowFilterMenu(false)}>
                    <h3>{(currentFilter)?currentFilter:'All'} </h3>
                    <ExpandMoreOutlinedIcon className={`filterIcon ${(showFilterMenu) ? 'rotateFilter' : ''}`} />

                    <div
                        className={`filterMenuContainer ${(showFilterMenu) ? 'filterMenuContainerActive' : ''}`}>
                        <ul>
                            <li onClick={()=>{
                                setcurrentFilter(null)
                                setshowFilterMenu(false);
                            }}>All</li>
                            {Object.keys(projects).map((ele) => {
                                return (
                                    <li
                                    key={ele}
                                    onClick={()=>{
                                        setcurrentFilter(ele);
                                        setshowFilterMenu(false);
                                    }}
                                    >{ele}</li>
                                )
                            })}
                        </ul>
                    </div>

                </button>
            </div>
        </div>
    )
}

export default TopBar
