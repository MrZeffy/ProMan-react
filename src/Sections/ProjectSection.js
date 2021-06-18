import React from 'react'
import './ProjectSection.css'

// Icons

import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';


const ProjectSection = () => {
    return (
        <div className="projectSectionContainer">
            <div className="headingSection">
                <div className="headingContainer">
                    <h2>Projects</h2>
                </div>
                <div className="filterContainer">
                    <h3>All </h3>
                    <ExpandMoreOutlinedIcon />
                </div>
            </div>
        </div>
    )
}

export default ProjectSection
