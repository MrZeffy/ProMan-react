const DBWrapper = require('../database/connection');


// describe('Testing methods responsible for CRUD operations', ()=>{
//     let dbConnectionOptions = null;
//     beforeAll(async () => {
//         dbConnectionOptions = {
//             host: 'localhost',
//             user: 'root',
//             password: 'Daman6232'
//         };
//         DBWrapper.setConnector(dbConnectionOptions);

//         await DBWrapper.establishConnection();
//         await DBWrapper.setupSchema();

//     })

//     it('Just empty', ()=>{
//         expect(1).toEqual(1);
//     })

//     describe('Find a user function', () => {

//         it('The function checks if a user is already present or not', async () => {
//             try {

//                 let result = await DBWrapper.findUser('damanarora724@gmail.com');
//                 expect(result).toBeTruthy();

//                 result = await DBWrapper.findUser('IamNotAUser@mango.com');
//                 expect(result).not.toBeTruthy();
//             } catch (err) {
//                 console.log("Test failed with error", err)
//                 fail(err);
//             }
//         })


//         it('The function checks if a user is present using user id', async () => {
//             try {
//                 let result = await DBWrapper.findUserById('6ecd2b1a-4d5e-4d72-b947-5b6e4c3bc02f');
//                 expect(result).toBeTruthy();

//                 result = await DBWrapper.findUserById('wrongValue');
//                 expect(result).not.toBeTruthy();

//             } catch (err) {
//                 console.log("Test failed with error", err)
//                 fail(err);
//             }
//         })

//     })
    
// })


describe("A spec", function () {
    var foo;

    beforeEach(function () {
        foo = 0;
        foo += 1;
    });

    afterEach(function () {
        foo = 0;
    });

    it("is just a function, so it can contain any code", function () {
        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", function () {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });

    describe("nested inside a second describe", function () {
        var bar;

        beforeEach(function () {
            bar = 1;
        });

        it("can reference both scopes as needed", function () {
            expect(foo).toEqual(bar);
        });
    });
});