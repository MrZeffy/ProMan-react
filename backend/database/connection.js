const mysql = require('mysql');




// Creating mysql connector api
const getConnector = (connectorOptions)=>{
    return mysql.createConnection(connectorOptions);
}


// Wrapping Connection Function inside a promise.
const establishConnection = (connector)=>{
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
const executeQuery = async (connector, queryString) =>{
    connector.query(queryString, (err, result, fields)=>{
        if(err){
            throw new Error(err);
        }
        return {result, fields};
    })
}


const setupSchema = async (connector) => {
    try{
        await executeQuery(connector, `CREATE DATABASE IF NOT EXISTS pro_man;`);
        await executeQuery(connector, 'USE pro_man;');
        console.log('Using our database now');

    }catch(err){
        throw new Error(err);
    }
}



module.exports = {
    setupSchema,
    getConnector, 
    establishConnection,
    executeQuery
}


