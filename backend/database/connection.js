const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { use } = require('passport');

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
        
        await executeQuery(`CREATE TABLE IF NOT EXISTS user_creds (
            user_id VARCHAR(100) PRIMARY KEY,
            username VARCHAR(30) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL
        );`)
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
            throw new Error('User not found');
        } else {
            return results[0];
        }
    } catch (err) {
        throw new Error(err);
    }
}


const createUser = async (username, password) => {
    try{
        const uid = uuidv4();;
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


