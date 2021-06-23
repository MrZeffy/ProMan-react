import React from 'react'
import './timeTracker.css'


/*const projects = {
    allProjects: []
};
class Project {
    constructor(id, title) {
      this.id = id;
      this.title = title;
    }
  }

const newProject = new Project(ID, title);
projects.allProjects.push(newProject);*/



const timeTracker = () => {
    return (
        <>

            <form className="timeTrackerForm">
                <input placeholder="what are you working on"></input>
                <input type="submit" value="Submit"></input>
            </form>


            <ul className="projectslist">
            </ul>

        </>
    )
}

export default timeTracker
