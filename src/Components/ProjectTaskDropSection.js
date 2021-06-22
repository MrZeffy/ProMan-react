import {useState} from 'react'
import './ProjectTaskDropSection.css'
import AddNewTaskForm from './AddNewTaskForm'

const ProjectTaskDropSection = ({ id, heading, taskCount, tasks, addNewTask }) => {

    const [showAddForm, setshowAddForm] = useState(false)
    
    const handleNewButtonClick = ()=>{
        setshowAddForm(true)
        console.log('set to true')
    }

    return (
        <>
        {(showAddForm)?<AddNewTaskForm id={id} setshowAddForm={setshowAddForm} addNewTask={addNewTask}/>:''}

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

        </div>
        </>
    )
}

export default ProjectTaskDropSection
