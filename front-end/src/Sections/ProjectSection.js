import { useState } from 'react'
import './ProjectSection.css'
import { useEffect } from 'react';



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

    let tempProjects = {};
    
    useEffect(()=>{
        refreshTasks();
    }, []);

    const refreshTasks = ()=>{
        fetchCustom('/getAllProjects')
            .then((receivedProjects) => {
                console.log('projects: ', receivedProjects);
                populateProjects(receivedProjects);
                console.log('after populating: ', JSON.parse(JSON.stringify(projects)));
                return fetchCustom('/getAllTasks')
            })
            .then((receivedTasks) => {
                console.log("Tasks: ", receivedTasks);
                populateTasks(receivedTasks);
            }).catch((err) => {
                console.log('ERROR getting all tasks: ', err);
            })
    }

    const populateProjects = (receivedProjects) => {
        let modifiedProjects = JSON.parse(JSON.stringify(projects));

        if(receivedProjects)
        receivedProjects.forEach((ele)=>{
            modifiedProjects[ele.project_name] = [ele.indicator_color, 0, ele.project_id];
        })

        tempProjects = modifiedProjects;
        
    }

    const populateTasks = (receivedTasks) => {
        let modifiedTasks = [[], [], []];
        let modifiedProjects = tempProjects;
        console.log('copied: ',JSON.parse(JSON.stringify(modifiedProjects)));
        
        if(receivedTasks)
        receivedTasks.forEach((ele)=>{
            let ourTask = {};
            ourTask.taskDescription = ele.task_description;
            ourTask.taskId = ele.task_id;
            ourTask.taskProject = ele.project_name;
            ourTask.taskProjectId = ele.project_id;
            ourTask.taskTitle = ele.task_title; 
            modifiedProjects[ele.project_name][1] += 1;
            modifiedTasks[ele.task_status].push(ourTask);
        });

        setProjects(modifiedProjects);
        setTasks(modifiedTasks);
        
    }
    

    const addNewTask = (task, id, edit)=>{
        // 'updating task list')

        let endpoint = '/addNewTask';
        let method = 'POST'

        if(edit){
            // return editExistingTask(task, id);
            endpoint = '/updateTask';
            method = 'PUT'
        }

        task.taskStatus = id;
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate()+30);
        task.taskDeadline = currentDate.toISOString();

        if(projects[task.taskProject]){
            task.taskProjectId = projects[task.taskProject][2];
        }else{
            task.taskProject = {
                projectName: task.taskProject,
                indicatorColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
            }
        }        

        fetchCustom(endpoint, method, {task: task})
        .then(()=>{
            refreshTasks();
        })
        .catch((err)=>{
            console.log('something went wrong', err.message);
        })
        
    }

    const updateTaskCategory = (taskId, oldCatInd, newCatInd)=>{

        fetchCustom('/updateTaskStatus', 'PUT', {taskId, status: newCatInd})
        .then(()=>{
            refreshTasks();
        })
        .catch((err)=>{
            console.log('error updating status', err.message);
        });
    }


    const deleteTask = (taskId, catInd)=>{

        fetchCustom('/deleteTask', 'DELETE', {taskId})
        .then(()=>{
            refreshTasks();
        })
        .catch((err)=>{
            console.log('Error Deleting task');
        })        
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
