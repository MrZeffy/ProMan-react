# ProMan - A project managing Application(Front-end)

A React application built for tracking project progress and managing time.


## Boost your productivity

Analyze how much time you are giving to different projects and boost your productivity.
(Pending feature)


## Add multiple projects

Add multiple projects and share the progress with your teammates.

## Database Schema:
[http://dbdesigner.net](https://dbdesigner.page.link/oY17P8fH7JHt4CzZ8)

## To start the server

1. Clone the repository.
2. Change directory.   
`cd ProMan-react\`  

You can update DB settings in .env file.

### For Docker:

3. Rename (docker)sample.env to .env in ProMan-react\backend.
4. Inside ProMan-react\, run  
`docker-compose up`
5. Wait for a few minutes for the server to start.

You can update DB settings in .env file.

### For localhost:
3. Navigate to ProMan-react\backend\ .
3. Rename sample.env to .env, update DB host, password.
4. run `npm install` to install dependencies
5. Then, run `node app.js` to start the server.

  
## To run unit tests:
1. Navigate to ProMan-react\backend\ .
2. run `npm test` to start the unit tests.  
>Make sure your DB credentials are configured before running the tests.


## To run Front-end
1. Navigate to ProMan-react\front-end\ and install dependencies for React with `npm install`
2. Then run with `npm start`

## To build front-end for deployment

Navigate to ProMan-react\front-end\ and run `npm build`
