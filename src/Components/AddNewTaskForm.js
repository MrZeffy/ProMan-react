import React from 'react'
import './AddNewTaskForm.css'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { borderColor } from '@material-ui/system'

const useStyles = makeStyles((theme)=>({
    textField: {
        borderColor: 'red',
    },
}));


const AddNewTaskForm = () => {
    return (
        <div className="formContainer">
            <form className="ourForm">
                <TextField id="outlined-basic" label="Outlined" variant="outlined"/>
            </form>
        </div>
    )
}

export default AddNewTaskForm
