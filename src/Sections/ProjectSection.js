import { useState } from 'react'
import './ProjectSection.css'
import { useEffect } from 'react';


import { v4 as uuid} from 'uuid';


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

    const [currentFilter, setcurrentFilter] = useState(null);


    const [projects, setProjects] = useState({});


    useEffect(() => {
        console.log(tasks)
    }, [tasks])

    const addNewTask = (task, id)=>{
        // console.log('updating task list')
        const alreadyExisting = tasks;

        task['taskId'] = uuid();


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

    const updateTaskCategory = (id, oldCatInd, newCatInd)=>{


        const oldTask = [...tasks];

        console.log("Update task function")

        console.log(JSON.parse(JSON.stringify(oldTask)));
        const taskToMove = oldTask[oldCatInd].find((ele)=>ele.taskId===id);
        console.log("After find")
        console.log(JSON.parse(JSON.stringify(oldTask)));
        oldTask[newCatInd].push(taskToMove);
        console.log("After push")
        console.log(JSON.parse(JSON.stringify(oldTask)));
        oldTask[oldCatInd] = oldTask[oldCatInd].filter((ele)=>(!(ele.taskId===id)))
        console.log(oldTask[oldCatInd]);
        console.log(JSON.parse(JSON.stringify(oldTask)));
        
        setTasks(oldTask);
        
    }


    return (
        <>
            <div className="projectSectionContainer">
                
                <TopBar showFilterMenu={showFilterMenu} 
                setshowFilterMenu={setshowFilterMenu} 
                projects={projects}
                setcurrentFilter={setcurrentFilter}
                currentFilter={currentFilter}/>


                <div className="dropperSectionContainer">
                    {projectSectionHeadings.map((heading, index) => {
                        return (
                            <ProjectTaskDropSection key={index} 
                            id={index}
                            heading={heading} 
                            tasks={tasks}

                            projects={projects}

                            addNewTask={addNewTask} 
                            currentFilter={currentFilter}
                            updateTaskCategory={updateTaskCategory}
                            />
                        )
                    })}
                </div>


            </div>
        </>
    )
}

export default ProjectSection
