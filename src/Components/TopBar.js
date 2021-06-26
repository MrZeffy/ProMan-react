import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';


const TopBar = ({projects, showFilterMenu, setshowFilterMenu}) => {
    return (
        <div className="headingSection">
            <div className="headingContainer">
                <h2>Projects</h2>
            </div>

            <div className="filterContainer">
                <button type="button" className="buttonForFilter"
                    onClick={() => setshowFilterMenu(!showFilterMenu)}
                    onBlur={() => setshowFilterMenu(false)}>
                    <h3>All </h3>
                    <ExpandMoreOutlinedIcon className={`filterIcon ${(showFilterMenu) ? 'rotateFilter' : ''}`} />

                    <div
                        className={`filterMenuContainer ${(showFilterMenu) ? 'filterMenuContainerActive' : ''}`}>
                        <ul>
                            {Object.keys(projects).map((ele) => {
                                return (
                                    <li>{ele}</li>
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
