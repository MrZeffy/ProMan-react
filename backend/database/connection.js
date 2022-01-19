const mysql = require('mysql');
const bcrypt = require('bcrypt');
const utils = require('../utils/utils');
const { v4: uuidv4 } = require('uuid');


const saltRounds = 1;

let connector = null;


// Creating mysql connector api
const setConnector = (connectorOptions)=>{
    connector = mysql.createConnection(connectorOptions);
    return connector;
}


// Wrapping Connection Function inside a promise.
const establishConnection = ()=>{
    return new Promise((resolve, reject)=>{
        connector.connect((err)=>{
            if(err){
                reject(err)
            }else{
                resolve();
            }
        })
    })
}


// Using async keyword.
// Creating Wrapper so we can work with promises.
// Executes a given query and returns the resul.
const executeQuery = (query) =>{
    return new Promise((resolve, reject)=>{
        connector.query(query, (err, result) => {
            if (err) {
                
                reject(err);
            }
            
            resolve(result);
        })
    })
    
}


const setupSchema = async () => {
    try{
        await executeQuery(`CREATE DATABASE IF NOT EXISTS pro_man;`);
        await executeQuery('USE pro_man;');
        
        await executeQuery(`CREATE TABLE IF NOT EXISTS user_info(user_id VARCHAR(100) PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL);`);

        await executeQuery(`CREATE TABLE IF NOT EXISTS user_creds (
            user_id VARCHAR(100) PRIMARY KEY ,
            username VARCHAR(30) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            FOREIGN KEY(user_id) REFERENCES user_info(user_id) ON DELETE CASCADE

        );`);
        await executeQuery(`CREATE TABLE IF NOT EXISTS projects (
            project_id VARCHAR(100),
            project_name VARCHAR(50) NOT NULL,
            project_admin VARCHAR(100),
            indicator_color VARCHAR(50) NOT NULL,
            PRIMARY KEY(project_id, project_admin),
            FOREIGN KEY(project_admin) REFERENCES user_info(user_id) ON DELETE CASCADE
        );`);

        await executeQuery(`CREATE TABLE IF NOT EXISTS tasks (
            task_id VARCHAR(100) PRIMARY KEY,
            task_title VARCHAR(200) NOT NULL,
            project_id VARCHAR(100),
            task_creation_date DATETIME NOT NULL,
            FOREIGN KEY(project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
            task_description TEXT,
            task_deadline DATETIME,
            task_status INT NOT NULL
        );`)
        await executeQuery(`CREATE TABLE IF NOT EXISTS task_owner (
            user_id VARCHAR(100),
            task_id VARCHAR(100),
            FOREIGN KEY(user_id) REFERENCES user_info(user_id) ON DELETE CASCADE,
            FOREIGN KEY(task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
            PRIMARY KEY(user_id, task_id)
        )`);
        await executeQuery(`CREATE TABLE IF NOT EXISTS task_access (
            user_id VARCHAR(100),
            task_id VARCHAR(100),
            date_assigned DATETIME,
            FOREIGN KEY(task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
            FOREIGN KEY(user_id) REFERENCES user_creds(user_id) ON DELETE CASCADE,
            PRIMARY KEY(user_id, task_id)
        )`);


        

    }catch(err){
        throw new Error(err);
    }
}


const findUser = async (username) => {
    try{
        // Escaping inputs to prevent SQL Injection.
        let queryObject = {
            sql: 'SELECT * FROM user_creds WHERE username=?',
            values: [username]
        }
        results = await executeQuery(queryObject);
        
        if (!results || results.length == 0) {
            return null;
        } else {
            return results[0];
        }
    }catch(err){
        throw new Error(err);
    }
}

// TODO: add unit tests
const getUserDetails = async (username) => {
    try {
        // Escaping inputs to prevent SQL Injection.
        let queryObject = {
            sql: 'SELECT * FROM user_info WHERE email=?',
            values: [username]
        }
        results = await executeQuery(queryObject);

        if (!results || results.length == 0) {
            return null;
        } else {
            return results[0];
        }
    } catch (err) {
        throw new Error(err);
    }
}

const deleteUser = async (username) =>{
    try{
        // Check if user exists.
        result = await findUser(username);
        
        if(result === null){
            return {message: 'User does not exists'};            
        }

        // Removing User
        await executeQuery(`DELETE FROM user_info WHERE email="${username}"`);    
        return {message: 'User removed'};
    }
    catch(err){
        throw new Error(err);
    }
}


const findUserById = async (userId) => {
    try {
        let queryObject = {
            sql: 'SELECT * FROM user_creds WHERE user_id=?',
            values: [userId]
        }
        results = await executeQuery(queryObject)
        if (!results || results.length == 0) {
            return null;
        } else {
            return results[0];
        }
    } catch (err) {
        throw new Error(err);
    }
}


const createUser = async (name, username, password) => {
    try{
        const uid = uuidv4();
        if(!name || !username || !password){
            return null;
        }
        let queryObject = {
            sql: 'INSERT INTO user_info VALUES (?, ?, ?)',
            values: [uid, name, username]
        }
        await executeQuery(queryObject)
        
        const hashedPass = await bcrypt.hash(password, saltRounds)

        queryObject = {
            sql: 'INSERT INTO user_creds VALUES (?, ?, ?)',
            values: [uid, username, hashedPass]
        }

        await executeQuery(queryObject);
        return await findUser(username);
    }
    catch(err){
        console.log(err);
        throw new Error('Error creating user'+err.message);
    }
}

const matchPassword = async (user, plainPass)=>{
    try{
        const matched = await bcrypt.compare(plainPass, user.password);
        return matched;
    }
    catch(err){
        throw new Error(err);
    }
}

const addNewProject = async (userId, projectName, indicatorColor)=>{
    try{
        const projectId = uuidv4();
        
        let queryObject = {
            sql: 'INSERT INTO projects VALUES(?, ?, ?, ?)',
            values: [projectId, projectName, userId, indicatorColor]
        };

        await executeQuery(queryObject);
        return projectId;
    }
    catch(e){
        throw new Error("Error creating project" + e.message);
    }
};

const findProject = async (projectId) => {
    try{
        let queryObject = {
            sql: 'SELECT * FROM projects WHERE project_id = ?',
            values: [projectId]
        };

        let results = await executeQuery(queryObject);
        
        return (results.length > 0)?results[0]:null;
    }
    catch(err){
        throw new Error("Error finding Project "+err.message);
    }
}

// TODO: Add unit tests.
const getAllProjects = async (userId) => {
    try {
        let queryObject = {
            sql: 'SELECT * FROM projects WHERE project_admin = ?',
            values: [userId]
        };

        let results = await executeQuery(queryObject);

        return (results.length > 0) ? results : null;
    }
    catch (err) {
        throw new Error("Error finding Project " + err.message);
    }
}

const deleteProject = async (projectId) => {
    if(!await findProject(projectId)){
        throw new Error('Project not found');
    }
    let queryObject = {
        sql: 'DELETE FROM projects WHERE project_id = ?',
        values: [projectId]
    };

    await executeQuery(queryObject);    
}


// TODO: add unit tests.
const getAllTasks = async (userId) => {
    try {
        let projects = await getAllProjects(userId);

        if(!projects){
            return null;
        }

        let projectIds = projects.map((project)=>project.project_id);

        let queryObject = {
            sql: 'SELECT * FROM tasks WHERE project_id IN (?)',
            values: [projectIds]
        };

        let foundTasks = await executeQuery(queryObject);

        if(foundTasks.length < 1){
            return null;
        }

        return foundTasks;

    }
    catch (err) {
        throw new Error("Error finding tasks " + err.message);
    }
}

const addNewTask = async (taskDetails, userId)=>{
    let {taskTitle, taskDeadline, taskDescription, taskProjectId, taskProject, taskStatus} = taskDetails;

    // * use toISOString while sending dates from frontend.

    let emptyInput = utils.isEmptyInput(taskTitle, taskDescription);
    let projectInfoAbsent = !(taskProjectId || taskProject);
    if(emptyInput || projectInfoAbsent){
        throw new Error('Required input fields missing');
    }
    try{

        // Check if project exists.
        let projectFound = (taskProjectId)?await findProject(taskProjectId):null;
        if(!projectFound || projectFound.length < 1){
            taskProjectId = await addNewProject(userId, taskProject.projectName, taskProject.indicatorColor);
        }

        let taskId = uuidv4();
        let formattedTaskCreationDate = utils.getDateTimeString(new Date);
        let formattedTaskDeadline = utils.getDateTimeString(new Date(taskDeadline));
        let queryObject = {
            sql: 'INSERT INTO tasks VALUES (?, ?, ?, ?, ?, ?, ?)',
            values: [taskId, taskTitle, taskProjectId, formattedTaskCreationDate, taskDescription, formattedTaskDeadline, taskStatus]
        };

        await executeQuery(queryObject);

        return taskId;
        
    }
    catch(e){
        throw new Error('Error adding new task '+e.message);
    }
}

const findTaskById = async (taskId, userId) => {
    // TODO: enable task access restrictions.
    try{
        let queryObject = {
            sql: 'SELECT * FROM tasks WHERE task_id = ?',
            values: [taskId]
        }

        let tasks = await executeQuery(queryObject);
        if (tasks.length < 1) {
            throw new Error('Invalid taskId');
        }

        return tasks[0];
    }
    catch(err){
        throw new Error('Error finding task '+err.message);
    }
}

// TODO: Add unit tests.
const deleteTask = async (taskId, userId) => {
    // TODO: delete only if user is admin of the task.
    try{
        let taskPresent = await findTaskById(taskId);

        if (!taskPresent) {
            throw new Error('invalid taskId');
        }

        let projectId = taskPresent.project_id;
        let foundProject = await findProject(projectId);
        if (!foundProject) {
            throw new Error('Invalid ProjectId');
        }

        if (foundProject.project_admin === userId) {
            let queryObject = {
                sql: 'DELETE FROM tasks WHERE task_id = ?',
                values: [taskId]
            }
            await executeQuery(queryObject);
            return;
        }
        throw new Error('Not enough rights');
    }
    catch(err){
        throw new Error('Error deleting task: '+err.message)
    }
}

module.exports = {
    findUser,
    getUserDetails,
    setupSchema,
    setConnector, 
    establishConnection,
    executeQuery,
    createUser,
    matchPassword,
    findUserById,
    deleteUser,
    addNewProject,
    deleteProject,
    findProject,
    addNewTask,
    getAllProjects,
    getAllTasks,
    deleteTask
}


