import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import Book from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';

//  an instance of the Express application
const app = express();

// we need a middleware to parse the request body
app.use(express.json());

app.use('/books', booksRoute);

// mongoose is a library that allows us to interact with mongodb database using javascript 
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