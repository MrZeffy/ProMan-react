import {useState} from 'react'
import './ProjectSection.css'


// Componenets

import ProjectTaskDropSection from '../Components/ProjectTaskDropSection';

// Icons

import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';



const projectSectionHeadings = [ 'To do', 'In progress', 'Completed' ];

const ProjectSection = () => {
    
    const [taskCount, setTaskCount] = useState([0,0,0]);
    const [tasks, setTasks] = useState([[], [], []]);
    
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

            <div className="dropperSectionContainer">                
                {projectSectionHeadings.map((heading, index)=>{
                    return (
                        <ProjectTaskDropSection key={index} heading={heading} taskCount={taskCount[index]} tasks={tasks[index]}/>
                    )
                })}
            </div>


        </div>
    )
}

export default ProjectSection
