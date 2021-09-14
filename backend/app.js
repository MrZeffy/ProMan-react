// Importing from packages.
const express = require('express');
const {passport, DBWrapper, registerNewUser} = require('./auth/auth');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session');
const { use } = require('passport');



// Importing DB connection file.

// const DBWrapper = require('./database/connection');


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

DBWrapper.setConnector(dbConnectionOptions);




// configuring Express app.

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

// Custom middlewares

// 1. Login Check middlewares.

const isLoggedInSign = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect('/');
    next();
}




// Endpoints
app.get('/', (req, res)=>{
    res.send("Welcome to ProMan.")

});


app.get('login', (req, res)=>{
    res.send("LOGIN PAGE COMING SOON");
})

app.post('/signup', isLoggedInSign, (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    if(!username || !password){
        return res.status().send({message: 'Bad Request'});
    }
    registerNewUser(username, password).then((result)=>{
        if(result === null){
            
            return res.redirect('/login');
        }
        res.send({message: 'Sign up successful'});
    }).catch((err)=>{
        console.log(err);
        return res.status(500).send({message: "Something went wrong"});
    })
}) 







// Establishing connection to database

DBWrapper.establishConnection()
.then(()=>{
    console.log('Database Connection Successful');
    return DBWrapper.setupSchema()
}).then(()=>{
    // Server listening to incoming requests.
    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    })
})
.catch((err)=>{
    console.log(err.message);
})



