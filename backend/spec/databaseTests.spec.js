const DBWrapper = require('../database/connection');


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
                console.log("Test failed with error", err)
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
                console.log("Test failed with error", err)
                fail(err);
            }
        })

    })

    it('The function responsible for creating a new user', async ()=>{
        try{

            // Already existing user.
            let promise = DBWrapper.createUser('John', 'john55@gmail.com', '1234');
            await expectAsync(promise).toBeRejected();

            // Incomplete data
            promise = DBWrapper.createUser('no Data');
            await expectAsync(promise).toBeRejected();
        }
        catch(err){
            console.log("Test failed with error", err)
                fail(err);
        }
    })
    
})

