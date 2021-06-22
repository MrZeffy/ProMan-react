import { useState } from 'react'
import './ProjectTaskDropSection.css'
import AddNewTaskForm from './AddNewTaskForm'

// Icons
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';




const ProjectTaskDropSection = ({ id, heading, tasks, addNewTask }) => {

    const taskCount = tasks.length;
    const [showAddForm, setshowAddForm] = useState(false)

    const handleNewButtonClick = () => {
        setshowAddForm(true)
        console.log('set to true')
    }


    const returnRandomColorStyle = () => ({
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    })


    const currentTask = {
        taskId: 'dsafas',
        taskTitle: 'Dummy',
        taskDescription: 'description',
        taskProject: 'project'
    };

    return (
        <>
            {(showAddForm) ? <AddNewTaskForm id={id} setshowAddForm={setshowAddForm} addNewTask={addNewTask} /> : ''}

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
                    <button index={id} onClick={handleNewButtonClick}>+</button>
                </div>

                
                {tasks.map((currentTask)=>(
                    <div className="taskContainer" draggable>
                        <h5><FiberManualRecordIcon style={returnRandomColorStyle()} className="headingDot" />{currentTask.taskTitle}</h5>
                        <p className="taskDescriptionText">{currentTask.taskDescription}</p>
                        <p className="taskProjectText">{currentTask.taskProject}</p>
                    </div>
                ))}

                
            </div>
        </>
    )
}

export default ProjectTaskDropSection
