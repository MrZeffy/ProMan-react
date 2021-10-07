import { useState } from 'react'
import './ProjectSection.css'
import { useEffect } from 'react';


import { v4 as uuid} from 'uuid';


// Componenets

import TopBar from '../Components/TopBar';
import ProjectTaskDropSection from '../Components/ProjectTaskDropSection';
import StatusBar from '../Components/StatusBar';

// Custom Hooks

import { useFetchFunctionContext } from '../Contexts/FetchHook';


const projectSectionHeadings = ['To do', 'In progress', 'Completed'];

const ProjectSection = ({ setActiveMenuItem, item }) => {

    const [showFilterMenu, setshowFilterMenu] = useState(false)
    
    const [tasks, setTasks] = useState([[], [], []]);

    const [currentFilter, setcurrentFilter] = useState(null);


    const [projects, setProjects] = useState({});

    const fetchCustom = useFetchFunctionContext();


    useEffect(() => {
        const dataToSend = [];
        tasks.forEach((sub, index)=>{
            sub.forEach((task)=>{
                dataToSend.push({
                    ...task,
                    state: index
                });
            })
        });
        console.log(dataToSend);
        // Sending Tasks to the backend.

        fetchCustom('/tasks', 'POST', {tasks: dataToSend});
        
    }, [tasks, fetchCustom]);


    const editExistingTask = (task, id) => {
        let alreadyExisting = [...tasks];

        alreadyExisting[id] = alreadyExisting[id].map((entry)=>{
            if(entry.taskId === task.taskId){
                if(entry.taskProject !== task.taskProject){
                    addProject(task.taskProject);
                }
                return task;
            }
            return entry;
        });

        setTasks(alreadyExisting);
    }

    const addProject = (taskProject) =>{
        const oldProjects = {...projects};

        if (!oldProjects[taskProject]) {
            oldProjects[taskProject] = [`
            rgb(${Math.floor(Math.random() * 255)}, 
            ${Math.floor(Math.random() * 255)}, 
            ${Math.floor(Math.random() * 255)})`
                , 1]

        } else {
            oldProjects[taskProject][1] += 1;
        }

        setProjects(oldProjects);
    }

    const addNewTask = (task, id, edit)=>{
        // 'updating task list')

        if(edit){
            return editExistingTask(task, id);
        }
        const alreadyExisting = [...tasks];

        const anotherArray = tasks.map((cats)=>{return {...cats}});

        console.log(alreadyExisting, anotherArray);

        task['taskId'] = uuid();

        addProject(task.taskProject);
        
        
        
        alreadyExisting[id].push(task);
        setTasks(alreadyExisting);
        console.log("Set tasks successfuly")
        
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
                <StatusBar/>
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
