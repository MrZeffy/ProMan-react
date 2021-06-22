import React from 'react'
import './AddNewTaskForm.css'






const AddNewTaskForm = ({id, setshowAddForm}) => {
    

    const handleCancel = ()=>{
        setshowAddForm(false);
    }


    return (
        <div className="formContainer">
            <form className="ourForm" autoComplete="off">
                
                <h2>Enter task details</h2>
                <input name="projectSelected" id="projectSelected" list="projectSelectedList"
                    placeholder="Select Project" 
                    required/>
                <datalist id="projectSelectedList">
                    <option value="blah"></option>
                    <option value="blah" />
                    <option value="black" />
                    <option value="sheep" />
                </datalist>
                <input type="text" name="taskTitle" id="taskTitle" 
                placeholder='Title'
                required/>
                <textarea rows="5" placeholder="Description"
                required></textarea>
                <div className="buttonsContainer">
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewTaskForm
