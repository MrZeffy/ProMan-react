const mysql = require('mysql');
const bcrypt = require('bcrypt');
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
const executeQuery = (queryString) =>{
    return new Promise((resolve, reject)=>{
        connector.query(queryString, (err, result) => {
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
            project_id VARCHAR(100) PRIMARY KEY,
            project_name VARCHAR(50) NOT NULL
        );`);
        await executeQuery(`CREATE TABLE IF NOT EXISTS tasks (
            task_id VARCHAR(100) PRIMARY KEY,
            task_title VARCHAR(200) NOT NULL,
            project_id VARCHAR(100),
            task_creation_date DATE,
            FOREIGN KEY(project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
            task_description TEXT,
            task_deadline DATE
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
            date_assigned DATE,
            FOREIGN KEY(task_id) REFERENCES tasks(task_id) ON DELETE CASCADE,
            FOREIGN KEY(user_id) REFERENCES user_creds(user_id) ON DELETE CASCADE,
            PRIMARY KEY(user_id, task_id)
        )`);


        console.log("SCHEMA SETUP SUCCESSFUL");

    }catch(err){
        throw new Error(err);
    }
}


const findUser = async (username) => {
    try{
        results = await executeQuery(`SELECT * FROM user_creds WHERE username="${username}";`)
        
        if (!results || results.length == 0) {
            return null;
        } else {
            return results[0];
        }
    }catch(err){
        throw new Error(err);
    }
}


const findUserById = async (userId) => {
    try {
        results = await executeQuery(`SELECT * FROM user_creds WHERE user_id="${userId}";`)
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
        await executeQuery(`INSERT INTO user_info VALUES ("${uid}", "${name}", "${username}")`)
        const hashedPass = await bcrypt.hash(password, saltRounds)
        results = await executeQuery(`INSERT INTO user_creds VALUES ("${uid}", "${username}", "${hashedPass}");`);
        
    }
    catch(err){
        throw new Error('Error creating user', err);
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


module.exports = {
    findUser,
    setupSchema,
    setConnector, 
    establishConnection,
    executeQuery,
    createUser,
    matchPassword,
    findUserById
}


