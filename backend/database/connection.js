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
            task_creation_date DATETIME,
            FOREIGN KEY(project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
            task_description TEXT,
            task_deadline DATETIME
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

        console.log(results);
        return results;
    }
    catch(err){
        throw new Error("Error finding Project "+err.message);
    }
}

const deleteProject = async (projectId) => {
    let queryObject = {
        sql: 'DELETE FROM projects WHERE project_id = ?',
        values: [projectId]
    };

    let results = await executeQuery(queryObject);
    console.log(results);
}

const addNewTask = async (taskDetails, userId)=>{
    let {taskTitle, taskDeadline, taskDescription, taskProjectId, taskProject} = taskDetails;

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
            await addNewProject(userId, taskProject.projectName, taskProject.indicatorColor);
        }

        let taskId = uuidv4();
        let formattedTaskCreationDate = utils.getDateTimeString(new Date);
        let formattedTaskDeadline = utils.getDateTimeString(new Date(taskDeadline));
        let queryObject = {
            sql: 'INSERT INTO tasks VALUES (?, ?, ?, ?, ?, ?)',
            values: [taskId, taskTitle, taskProjectId, taskDescription, formattedTaskDeadline, formattedTaskCreationDate]
        };

        await executeQuery(queryObject);
        
    }
    catch(e){
        throw new Error(e);
    }
}

module.exports = {
    findUser,
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
    addNewTask
}


