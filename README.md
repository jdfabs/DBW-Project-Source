# DBW-Project-Source
Recipe Regenerator Web App

Welcome to the Recipe Regenerator Web App! This application allows users to generate recipes based on their preferences (or ingredients in the fridge).

Installation

To run this application, you need to have Node.js, npm installed on your system. Also requires an Atlas dataBase and OpenAI API key!

1) Clone this repository to your local machine: https://github.com/jdfabs/DBW-Project-Source

2) Install dependencies using npm: "npm i" at the root folder

3) Configuration before running the app. you need to configure it with your environment variables.
    Change the config.js file in the root directory:
    You must Change: 
    - dbPassword
    - dbUser
    - sessionKey 
    - supportEmail
    - supportEmailPassword (using google app passwords)

4) set your OpenAI API key as environment variable  key: https://platform.openai.com/docs/quickstart?context=node


5) Running the App. Once you've installed dependencies and configured the app, you can start the server:

"nodemon app"

This will start the server and make the app accessible at http://localhost:3000.


Dependencies

    Express.js: Web framework for Node.js
    Mongoose: MongoDB object modeling for Node.js
    Method-Override: Middleware for HTTP verbs override
    Morgan: HTTP request logger middleware
    Passport: Authentication middleware for Node.js
    Socket.io: Real-time bidirectional event-based communication