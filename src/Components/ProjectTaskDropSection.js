import React from 'react'
import './ProjectTaskDropSection.css'

const ProjectTaskDropSection = ({heading, taskCount, tasks}) => {
    return (
        <div className="projectDropSection">
            <div className="projectSectionDetailsContainer">
                <div className="sectionHeadingContainer">
                    <h4>{heading}</h4>                    
                </div>
                <div className="taskCountContainer">
                    <span className="taskCount">{taskCount}</span>
                </div>
            </div>
            <div className="addButtonContainer">
                <button>+</button>
            </div>
            
        </div>
    )
}

export default ProjectTaskDropSection
