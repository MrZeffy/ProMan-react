import { useState } from 'react'
import './ProjectSection.css'
import { useEffect } from 'react';


// Componenets

import ProjectTaskDropSection from '../Components/ProjectTaskDropSection';

// Icons

import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';



const projectSectionHeadings = ['To do', 'In progress', 'Completed'];

const ProjectSection = ({ setActiveMenuItem, item }) => {

    useEffect(() => {
        console.log(item);
        setActiveMenuItem(item);

    })
    
    const [tasks, setTasks] = useState([[], [], []]);

    const addNewTask = (task, id)=>{
        console.log('updating task list')
        const alreadyExisting = tasks;
        alreadyExisting[id].push(task);
        setTasks(alreadyExisting);
        console.log(alreadyExisting)
    }


    return (
        <>
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
                    {projectSectionHeadings.map((heading, index) => {
                        return (
                            <ProjectTaskDropSection key={index} 
                            id={index}
                            heading={heading} 
                            tasks={tasks[index]}
                            addNewTask={addNewTask} 
                            />
                        )
                    })}
                </div>


            </div>
        </>
    )
}

export default ProjectSection
