import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";

//  an instance of the Express application
const app = express();

// route handler for the root URL (/), when a client makes a GET request to the route URL, the callback function is executed
app.get('/',(request, response)=>{
    console.log(request); //  the incoming HTTP request which contains information such as headers, query parameters, and request body.
    return response.status(664).send("ReadQuest is Work in Progress. Stay Tuned :)"); // the outging response sent to the client 
});


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App connected to the database");
        // function to listens to the port for incoming requests
        app.listen(PORT, () => {
            console.log(`App is listening to PORT: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });