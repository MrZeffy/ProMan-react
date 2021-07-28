// Importing from packages.
const express = require('express');


// Importing DB connection file.

const DBWrapper = require('./database/connection');


// Initializing app.
const app = express();


// Setting up port
const port = process.env.PORT || 3001;


// Getting DB Connector
const dbConnectionOptions = {
    host: 'localhost',
    user: 'root',
    password: 'Daman6232'
};

const dbConnector = DBWrapper.getConnector(dbConnectionOptions);



app.get('/', (req, res)=>{
    res.send("Welcome to ProMan.")

})



// Establishing connection to database

DBWrapper.establishConnection(dbConnector)
.then(()=>{
    console.log('Database Connection Successful');
    return DBWrapper.setupSchema(dbConnector)
}).then(()=>{
    // Server listening to incoming requests.
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    })
})
.catch((err)=>{
    console.log(err.message);
})



