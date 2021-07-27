// Importing from packages.
const express = require('express');

// Initializing app.
const app = express();


// Setting up port
const port = process.env.PORT || 3001;


app.get('/', (req, res)=>{
    res.send("Welcome to ProMan.")
})


app.listen(port, ()=>{
    console.log(`Server is listening at http://localhost:${port}`);
})

