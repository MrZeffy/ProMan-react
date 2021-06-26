import { useState } from 'react'
import './ProjectSection.css'
import { useEffect } from 'react';


// Componenets

import TopBar from '../Components/TopBar';
import ProjectTaskDropSection from '../Components/ProjectTaskDropSection';


// Icons






const projectSectionHeadings = ['To do', 'In progress', 'Completed'];

const ProjectSection = ({ setActiveMenuItem, item }) => {

    useEffect(() => {
        
        setActiveMenuItem(item);

    })


    const [showFilterMenu, setshowFilterMenu] = useState(false)
    
    const [tasks, setTasks] = useState([[], [], []]);


    const [projects, setProjects] = useState({});

    const addNewTask = (task, id)=>{
        // console.log('updating task list')
        const alreadyExisting = tasks;



        const oldProjects = projects;

        if(!oldProjects[task.taskProject]){
            oldProjects[task.taskProject] = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
            setProjects(oldProjects);
        }
        
        
        alreadyExisting[id].push(task);
        setTasks(alreadyExisting);
        console.log(alreadyExisting)
        console.log(projects);

    }


    return (
        <>
            <div className="projectSectionContainer">
                
                <TopBar showFilterMenu={showFilterMenu} setshowFilterMenu={setshowFilterMenu} projects={projects}/>


                <div className="dropperSectionContainer">
                    {projectSectionHeadings.map((heading, index) => {
                        return (
                            <ProjectTaskDropSection key={index} 
                            id={index}
                            heading={heading} 
                            tasks={tasks[index]}

                            projects={projects}

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
