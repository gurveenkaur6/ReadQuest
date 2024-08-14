import express from "express";
import {PORT} from "./config.js";

//  an instance of the Express application
const app = express();

// route handler for the root URL (/), when a client makes a GET request to the route URL, the callback function is executed
app.get('/',(request, response)=>{
    console.log(request); //  the incoming HTTP request which contains information such as headers, query parameters, and request body.
    return response.status(664).send("ReadQuest is Work in Progress. Stay Tuned :)"); // the outging response sent to the client 
});

// function to listens to the port for incoming requests
app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`);
});
