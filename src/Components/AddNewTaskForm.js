import {useState} from 'react'
import './AddNewTaskForm.css'
import {v4 as uuid} from 'uuid';





const AddNewTaskForm = ({id, setshowAddForm, addNewTask}) => {
    


    const [title, settitle] = useState('')

    const [description, setdescription] = useState('')

    const [project, setproject] = useState('')

    

    const handleCancel = ()=>{
        setshowAddForm(false);
    }

    const handleSubmit = (event)=>{
        handleCancel();
        addNewTask({
            taskId: uuid(),
            taskTitle: title,
            taskDescription: description,
            taskProject: project
        }, id);
        
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
                    required
                    onChange={(event)=>{handleChange(event, setproject)}}/>
                <datalist id="projectSelectedList">
                    <option value="blah"></option>
                    <option value="blah" />
                    <option value="black" />
                    <option value="sheep" />
                </datalist>
                <input type="text" name="taskTitle" id="taskTitle" 
                placeholder='Title'
                required
                    onChange={(event) => { handleChange(event, settitle) }}/>
                <textarea rows="5" placeholder="Description"
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
