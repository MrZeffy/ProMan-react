require('dotenv').config();
const DBWrapper = require('../database/connection');
const {registerNewUser} = require('../auth/auth');
const testUtils = require('../utils/testUtils');


describe('Testing methods responsible for CRUD operations', ()=>{
    let dbConnectionOptions = null;
    beforeAll(async () => {
        try{
            dbConnectionOptions = {
                host: 'localhost',
                user: 'root',
                password: process.env.MYSQL_PASSWORD || 'password'
            };
            DBWrapper.setConnector(dbConnectionOptions);

            await DBWrapper.establishConnection();
            await DBWrapper.setupSchema();
        }
        catch (err){
            console.log('Error'+err.message)
        }

    })    

    describe('Find a user function', () => {

        let user = null;

        beforeAll(async ()=>{
            user = await DBWrapper.createUser('John Cena', 'john55@gmail.com', '1234');            
        });

        afterAll(async ()=>{
            await DBWrapper.deleteUser(user.username);
        });

        it('The function checks if a user is already present or not', async () => {
            try {

                let result = await DBWrapper.findUser(user.username);
                
                expect(result).toBeTruthy();

                result = await DBWrapper.findUser('IamNotAUser@mango.com');
                expect(result).not.toBeTruthy();
            } catch (err) {
                
                fail(err);
            }
        });

        it('The function checks if a user is present using user id', async () => {
            try {
                let result = await DBWrapper.findUserById(user.user_id);  
                expect(result).toBeTruthy();

                result = await DBWrapper.findUserById('wrongValue');
                expect(result).not.toBeTruthy();

            } catch (err) {
                
                fail(err);
            }
        });

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
        });
    })

    describe('Creating an already existing user', ()=>{        

        beforeAll(async ()=>{
            await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
        });

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
        });

    })

    describe('Deleting a user', ()=>{
        // DELETING A USER

        beforeAll( async ()=>{
            await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
        });

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
        });

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
        });
    });

    describe('Matching password', () => {
        let user = null;
        beforeAll(async ()=>{
            user = await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
        });

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
        });
    })

    describe('Creating a project', ()=>{
        let user = null;
        beforeAll(async () => {
            user = await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
        });
        

        it('With correct details', async ()=>{
            let returnedPromise = DBWrapper.addNewProject(user.user_id, 'Dummy project', 'rgb(0,0,0)');
            await expectAsync(returnedPromise).toBeResolved();
        });

        it('With incorrect userId', async ()=>{
            let returnedPromise = DBWrapper.addNewProject('badUserId', 'Dummy project', 'rgb(0,0,0)');
            await expectAsync(returnedPromise).toBeRejected();
        });

        afterAll(async ()=>{
            await DBWrapper.deleteUser(user.username);
        });
    });

    describe('Finding a project', ()=>{
        let projectId = null;
        let projectName = 'Dummy project';
        let user = null;
        beforeAll(async ()=>{
            user = await DBWrapper.createUser('John Cena', 'john55@gmail.com', '1234');
            projectId = await DBWrapper.addNewProject(user.user_id, projectName, 'rgb(1,1,1)');
        });

        afterAll(async ()=>{
            await DBWrapper.deleteUser(user.username);
        });

        it('With correct id', async ()=>{
            let returnedProject = await DBWrapper.findProject(projectId);
            expect(returnedProject.project_name).toEqual(projectName);
            expect(returnedProject.project_admin).toEqual(user.user_id);
        });

        it('With incorrect id', async ()=>{
            let returnedProject = await DBWrapper.findProject('invalidId');
            expect(returnedProject).toBeNull();
        })
        
        it('When no parameter is sent', async ()=>{
            let returnedProject = await DBWrapper.findProject();
            expect(returnedProject).toBeNull();
        })
    });

    describe('Delete a project', ()=>{
        let user = null;
        let projectId = null;
        let projectName = 'Dummy project';
        
        beforeAll(async () => {
            user = await DBWrapper.createUser('John Cena', 'john55@gmail.com', '1234');
            projectId = await DBWrapper.addNewProject(user.user_id, projectName, 'rgb(1,1,1)');
        });

        afterAll(async () => {
            await DBWrapper.deleteUser(user.username);
        });

        it('When correct projectId is given', async ()=>{
            let returnedPromise = DBWrapper.deleteProject(projectId);
            await expectAsync(returnedPromise).toBeResolved();

            let result = await DBWrapper.findProject(projectId);
            expect(result).toBeNull;
        });

        it('When no id is given', async () => {
            let returnedPromise = DBWrapper.deleteProject('incorrectId');
            await expectAsync(returnedPromise).toBeRejected('Project not found');
        }); 
    });

    describe('Add new Task', ()=>{
        let user = null;
        let projectId = null;

        beforeAll(async ()=>{
            user = await DBWrapper.createUser('John Cena', 'john55@gmail.com', '1234');
            projectId = await DBWrapper.addNewProject(user.user_id, 'Dummy text', 'rgb(0,0,0)');
        });

        afterAll(async () => {
            await DBWrapper.deleteUser(user.username);
        });

        it('when project is already', async ()=>{
            let taskDetails = testUtils.getDummyTask();

            taskDetails.taskProjectId = projectId;

            let returnedPromise = DBWrapper.addNewTask(taskDetails, user.user_id);
            await expectAsync(returnedPromise).toBeResolved();
            
        });

        it('when project is to be created', async ()=>{
            let taskDetails = testUtils.getDummyTask();

            taskDetails.taskProject = {
                projectName: 'Dummy project',
                indicatorColor: 'rgb(0,0,0)'
            };
            let returnedPromise = DBWrapper.addNewTask(taskDetails, user.user_id);
            await expectAsync(returnedPromise).toBeResolved();
            
        });
        
        it('When project details are missing', async () => {
            let taskDetails = testUtils.getDummyTask();

            let returnedPromise = DBWrapper.addNewTask(taskDetails, user.user_id);
            await expectAsync(returnedPromise).toBeRejected();

        })
    })

});

