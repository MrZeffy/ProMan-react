const axios = require('axios');
const DBWrapper = require('../database/connection');

axios.defaults.withCredentials = true;

describe('testing API endpoints', ()=>{
    let server = null;
    beforeAll((done)=>{
        server = require('../app');
        setTimeout(()=>{done()},
            500);

    })
    it('Should return homepage',async ()=>{
        let {data, status} = await axios.get('http://localhost:3001/');
        
        expect(status).toEqual(200);
        expect(data).toEqual(jasmine.objectContaining({message: 'Welcome to ProMan.'}));        
    });



    describe('Getting user Object', ()=>{
        
        it('Get user if not logged in',async ()=>{            
            let response = await axios.get('http://localhost:3001/getUser/');            
            expect(response.data).toEqual(jasmine.objectContaining({"message": "Please login first"}));
        })
        
    })




    describe('Registering for new User', ()=>{

        it('With Good details', async ()=>{
            let response = await axios.post('http://localhost:3001/signup', {
                name: 'John',
                email: 'john55@gmail.com',
                password: '1234'
            });
            expect(response.status).toEqual(200);
            expect(response.data).toEqual(jasmine.objectContaining({ message: 'Sign up successful'}))
        })

        it('With Bad Details', async()=>{
            let promise = axios.post('http://localhost:3001/signup/', {
                data: 'I will not send'
            });
            await expectAsync(promise).toBeRejected();
        })

        afterAll(async ()=>{
            await DBWrapper.deleteUser('john55@gmail.com');
        })

    })

    describe('registering duplicate data', ()=>{

        beforeAll(async()=>{
            await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
        })

        it('Repetitive details (Already signed up)', async () => {
            let response = await axios.post('http://localhost:3001/signup/', {
                name: 'John',
                email: 'john55@gmail.com',
                password: '1234'
            });            
            expect(response.data).toEqual(jasmine.objectContaining({ emailExists: true }))

        })
        afterAll(async () => {
            await DBWrapper.deleteUser('john55@gmail.com');
        })
    })

    describe('Logging in', ()=>{
        beforeAll(async () => {
            await DBWrapper.createUser('John', 'john55@gmail.com', '1234');
        })
        

        it('With good details', async () => {
            let response = await axios.post('http://localhost:3001/login', {
                username: 'john55@gmail.com',
                password: '1234'
            })            
            expect(response.data).toEqual(jasmine.objectContaining({username: 'john55@gmail.com'}));
        });

        it('With incorrect details', async ()=>{
            let promise = axios.post('http://localhost:3001/login', {
                username: 'john55@gmail.com',
                password: '4321'
            });
            await expectAsync(promise).toBeRejectedWithError('Request failed with status code 401');
        })

        afterAll(async ()=>{
            await DBWrapper.deleteUser('john55@gmail.com');
        })
        
    })

    afterAll(()=>{
        server.close();        
    })
})