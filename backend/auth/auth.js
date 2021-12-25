const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const DBWrapper = require('./../database/connection');

passport.use(new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async(username, password, done) =>{
        try{
            let user = await DBWrapper.findUser(username);
            if(user === null){
                return done(null, false, { message: 'User not exists' });
            }
            let matched = await DBWrapper.matchPassword(user, password);
            if(!matched){            
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        }
        catch(err){            
            return done(err);

        }
    }
));

passport.serializeUser((user, done)=>{
//     console.log("Serializing ", user);
    done(null, user['user_id']);

});

passport.deserializeUser(async (id, done)=>{
    // console.log("Deserializing ", id);
    const user = await DBWrapper.findUserById(id);
    done(null, user);
})
 

const registerNewUser = async (name, username, password)=>{
    const user = await DBWrapper.findUser(username)
    
    if (user !== null){
    
        return null;
    }

    let results = await DBWrapper.createUser(name, username, password);    
    
    return results;
}

module.exports = {
    passport,
    DBWrapper,
    registerNewUser
}