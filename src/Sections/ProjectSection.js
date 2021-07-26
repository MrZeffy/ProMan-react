import { useState } from 'react'
import './ProjectSection.css'
import { useEffect } from 'react';


import { v4 as uuid} from 'uuid';


// Componenets

import TopBar from '../Components/TopBar';
import ProjectTaskDropSection from '../Components/ProjectTaskDropSection';


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
        
    }, [tasks])

    const addNewTask = (task, id)=>{
        // 'updating task list')
        const alreadyExisting = tasks;

        

        task['taskId'] = uuid();


        const oldProjects = projects;

        if(!oldProjects[task.taskProject]){
            oldProjects[task.taskProject] = [`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`, 1]
            setProjects(oldProjects);
        }
        
        
        alreadyExisting[id].push(task);
        setTasks(alreadyExisting);
        
    }

    const updateTaskCategory = (id, oldCatInd, newCatInd)=>{
        const oldTask = [...tasks];
        const taskToMove = oldTask[oldCatInd].find((ele)=>ele.taskId===id);        
        
        oldTask[newCatInd].push(taskToMove);
        oldTask[oldCatInd] = oldTask[oldCatInd].filter((ele)=>(!(ele.taskId===id)))
        
        setTasks(oldTask);
    }


    const deleteTask = (taskId, catInd)=>{
        const oldTasks = [...tasks];
        let taskToRemove = null;
        oldTasks[catInd] = oldTasks[catInd].filter((ele)=>{
            if(ele.taskId === taskId){
                taskToRemove = ele;
            }
            return (ele.taskId !== taskId)
        });

        let updatedProject = {...projects};



        updatedProject[taskToRemove.taskProject][1] -= 1;

        if (updatedProject[taskToRemove.taskProject][1] === 0){
            delete updatedProject[taskToRemove.taskProject];
        }

        setProjects(updatedProject);



        setTasks(oldTasks);
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
                            deleteTask = {deleteTask}
                            />
                        )
                    })}
                </div>


            </div>
        </>
    )
}

export default ProjectSection
