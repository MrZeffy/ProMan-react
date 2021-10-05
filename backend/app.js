// Importing from packages.
const express = require('express');
const {passport, DBWrapper, registerNewUser} = require('./auth/auth');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session');
const cors = require('cors');




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

app.use(cookieParser('keyboard cat'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Custom middlewares

// 1. Login Check middlewares. 

const isLoggedInSign = (req, res, next) => {
    if (req.isAuthenticated()){
        console.log("Already authenticated");
        return res.redirect('/');
    } 
    next();
}

// 2. Check if not logged in Middleware
const checkIfNotLoggedIn = (req, res, next)=>{
    
    if(!req.isAuthenticated()){
        return res.send({"message": "Please login first"});
    }

    next();
    
}


// Endpoints
app.get('/', (req, res)=>{
    res.json({message: "Welcome to ProMan."})

});


app.get('/login', (req, res)=>{
    res.send("LOGIN PAGE COMING SOON");
})


app.post('/login', isLoggedInSign, passport.authenticate('local'), (req, res)=>{
    console.log(req.body.username, req.body.password);
    req.logIn(req.user, (err)=>{
        console.log("User logging in")
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        if(err){
            console.log(err);
            return res.send({"message": "Error"});
        } 
    });
    console.log(req.isAuthenticated());
    res.send(req.user);
});


app.get('/signup', isLoggedInSign, (req, res)=>{
    res.send({"Message": "user not logged in"});
})

app.post('/signup', isLoggedInSign, (req, res)=>{
    let username = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    if(!username || !password){
        return res.status().send({message: 'Bad Request'});
    }
    registerNewUser(name, username, password).then((result)=>{
        if(result === null){
            console.log("USer already exists");
            return res.json({emailExists: true});
        }
        res.send({message: 'Sign up successful'});
    }).catch((err)=>{ 
        console.log(err);
        return res.status(500).send({message: "Something went wrong"});
    })
}) 


app.get('/getUser', checkIfNotLoggedIn,(req, res)=>{
    res.send(req.user);
})

app.get('/logout', checkIfNotLoggedIn, (req, res)=>{
    req.logOut();
    console.log("Logout successful");
    return res.json({status: 0, message: "Logout successful"});
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



