import { useState } from 'react'
import './ProjectTaskDropSection.css'
import AddNewTaskForm from './AddNewTaskForm'

// Icons
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const ProjectTaskDropSection = ({ id, heading, tasks, addNewTask, projects, currentFilter, updateTaskCategory, deleteTask }) => {


    tasks = tasks[id];

    const taskCount = tasks.length;
    const [showAddForm, setshowAddForm] = useState(false)

    const handleNewButtonClick = () => {
        setshowAddForm(true)
        
    }


    const returnColorStyle = (projectName) => {        
        return {
        color: projects[projectName][0]
    }}

    const handleDrag = (e)=>{
        e.preventDefault();
    }

    const handleDragStart = (e, taskId)=>{
        e.dataTransfer.setData("id", taskId);
        e.dataTransfer.setData("oldIndex", id);
        
    }



    const handleDropEvent = (e)=>{
        
        
        const taskId = e.dataTransfer.getData("id");
        const taskCategoryIndex = e.dataTransfer.getData("oldIndex");

        if (parseInt(taskCategoryIndex) === id) {
            return;
        }

        updateTaskCategory(taskId, taskCategoryIndex, id);
    }
    return (
        <>
            {(showAddForm) ? <AddNewTaskForm id={id} setshowAddForm={setshowAddForm} addNewTask={addNewTask} /> : ''}

            <div className="projectDropSection" onDragOver={(e)=>handleDrag(e)}
            onDrop={(e)=>handleDropEvent(e)}>
                <div className="projectSectionDetailsContainer">
                    <div className="sectionHeadingContainer">
                        <h4>{heading}</h4>
                    </div>
                    <div className="taskCountContainer">
                        <span className="taskCount">{taskCount}</span>
                    </div>
                </div>
                <div className="addButtonContainer">
                    <button index={id} onClick={handleNewButtonClick}>+</button>
                </div>

                
                {tasks.filter((currentTask)=>
                (currentTask.taskProject === currentFilter 
                    || currentFilter === null))
                .map((currentTask)=>(
                    <div className="taskContainer" key={currentTask.taskId} draggable
                    onDragStart={(e)=>handleDragStart(e, currentTask.taskId)}>
                        
                        <div className="headingAndButtonsContainer">
                            <div className="taskHeadingContainer">
                                <h5>
                                    <FiberManualRecordIcon
                                        style={returnColorStyle(currentTask.taskProject)}
                                        className="headingDot" />
                                    {currentTask.taskTitle}
                                </h5>
                            </div>
                            <div className="modifyButtons">
                                <button>
                                    <span title="Edit"><EditOutlinedIcon className="modifyButtonIcons" /></span>
                                </button>
                                <button onClick={()=>{
                                    console.log("Working");
                                    deleteTask(currentTask.taskId, id)
                                }}>
                                    <span title="Delete"><DeleteOutlineIcon className="modifyButtonIcons" /></span>
                                </button>
                                
                            </div>
                            
                        </div>

                        
                        <p className="taskDescriptionText">{currentTask.taskDescription}</p>
                        <p className="taskProjectText">{currentTask.taskProject}</p>
                    </div>
                ))}

                
            </div>
        </>
    )
}

export default ProjectTaskDropSection
