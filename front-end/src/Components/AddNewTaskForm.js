import {useState, useEffect} from 'react'
import './AddNewTaskForm.css'

const AddNewTaskForm = ({id, setshowAddForm, addNewTask, fillData, setfillData, projects}) => {
    

    console.log("check ", fillData)

    let editTask = (fillData!==null)?true:false;

    useEffect(() => {
        console.log("editing");
    });


    let intialTitle = ''
    let initialDescription = ''
    let initialProject = ''
    console.log(editTask, "Edit task in start");
    if(fillData !== null){
        console.log('Edit mode');
        editTask = true;
        intialTitle = fillData.taskTitle;
        initialDescription = fillData.taskDescription
        initialProject = fillData.taskProject
    }

    const [title, settitle] = useState(intialTitle)

    const [description, setdescription] = useState(initialDescription)

    const [project, setproject] = useState(initialProject)
    

    const handleCancel = ()=>{
        setfillData(null)
        setshowAddForm(false);
    }

    const handleSubmit = (event)=>{
        console.log(editTask, "Edit task");
             
        addNewTask({
            taskId: (!editTask)?null:fillData.taskId,
            taskTitle: title,
            taskDescription: description,
            taskProject: project
        }, id, editTask);
        
        handleCancel();
        event.preventDefault();
    }

    

    const handleChange = (event, invoke)=>{
        invoke(event.target.value)
    }


    return (
        <div className="formContainer">
            <form className="ourForm" autoComplete="off"
            onSubmit={handleSubmit}>
                
                <h2>Enter task details</h2>
                <input name="projectSelected" id="projectSelected" list="projectSelectedList"
                    placeholder="Select Project" 
                    value={project}
                    required
                    onChange={(event)=>{handleChange(event, setproject)}}/>
                <datalist id="projectSelectedList">
                    {Object.keys(projects).map((ele)=>(
                        <option key={projects[ele][2]} value={ele} />
                    ))}
                </datalist>
                <input type="text" name="taskTitle" id="taskTitle" 
                placeholder='Title'
                    value={title}
                required
                    onChange={(event) => { handleChange(event, settitle) }}/>
                <textarea rows="5" placeholder="Description"
                    value={description}
                required
                    onChange={(event) => { handleChange(event, setdescription) }}></textarea>
                <div className="buttonsContainer">
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewTaskForm
