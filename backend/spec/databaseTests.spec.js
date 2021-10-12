const DBWrapper = require('../database/connection');
const {registerNewUser} = require('../auth/auth');


describe('Testing methods responsible for CRUD operations', ()=>{
    let dbConnectionOptions = null;
    beforeAll(async () => {
        dbConnectionOptions = {
            host: 'localhost',
            user: 'root',
            password: 'Daman6232'
        };
        DBWrapper.setConnector(dbConnectionOptions);

        await DBWrapper.establishConnection();
        await DBWrapper.setupSchema();

    })    

    describe('Find a user function', () => {

        it('The function checks if a user is already present or not', async () => {
            try {

                let result = await DBWrapper.findUser('damanarora724@gmail.com');
                expect(result).toBeTruthy();

                result = await DBWrapper.findUser('IamNotAUser@mango.com');
                expect(result).not.toBeTruthy();
            } catch (err) {
                
                fail(err);
            }
        })


        it('The function checks if a user is present using user id', async () => {
            try {
                let result = await DBWrapper.findUserById('6ecd2b1a-4d5e-4d72-b947-5b6e4c3bc02f');
                expect(result).toBeTruthy();

                result = await DBWrapper.findUserById('wrongValue');
                expect(result).not.toBeTruthy();

            } catch (err) {
                
                fail(err);
            }
        })

    })


    describe('Creating User', ()=>{
        it('The function responsible for creating a new user', async () => {
            try {
                // Creating a user.
                let result = await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
                expect(result).toBeTruthy();
            }
            catch (err) {
                
                fail(err);
            }
        });
        it('incomplete data for creating a new user', async () => {
            try {

                // Incomplete data
                result = await DBWrapper.createUser('no Data');
                expect(result).not.toBeTruthy();
            }
            catch (err) {
                
                fail(err);
            }
        });

        afterAll(async ()=>{
            await DBWrapper.deleteUser('john55@gmail.com');
        })
    })

    describe('Creating an already existing user', ()=>{        

        beforeAll(async ()=>{
            await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
        })

        it('Registering an already existing user', async () => {
            try {
                
                let result = await registerNewUser('John', 'john55@gmail.com', '1234');
                expect(result).toBeNull();
            }
            catch (err) {
                
                fail(err);
            }
        });
        afterAll(async ()=>{
            await DBWrapper.deleteUser('john55@gmail.com');
        })

    })

    describe('Deleting a user', ()=>{
        // DELETING A USER

        beforeAll( async ()=>{
            await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
        })

        it('Deleting a user that exists', async () => {
            try {
                // If user exists
                
                let result = await DBWrapper.deleteUser('john55@gmail.com');
                expect(result).toEqual(jasmine.objectContaining({
                    message: 'User removed'
                }));                
            }
            catch (err) {
                fail(err);
            }
        })

        it('Deleting a user that does not exists',async ()=>{
            try{
                // If user doesn't exists
                result = await DBWrapper.deleteUser('badUsername@blah.com');
                expect(result).toEqual(jasmine.objectContaining({
                    message: 'User does not exists'
                }));
            }
            catch(err){
                fail(err);
            }
        })
    });

    describe('Matching password', () => {
        let user = null;
        beforeAll(async ()=>{
            user = await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
        })

        it('With Correct password',async ()=>{
            let result = await DBWrapper.matchPassword(user, '1234');
            expect(result).toBeTrue();
        });
        it('With incorrect password',async () => {
            let result = await DBWrapper.matchPassword(user, '54321');
            expect(result).toBeFalse();
        });

        afterAll(async ()=>{
            await DBWrapper.deleteUser('john55@gmail.com');
        })
    })
    
 
})

