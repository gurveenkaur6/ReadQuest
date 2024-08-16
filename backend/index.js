import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import Book from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

//  an instance of the Express application
const app = express();

// Enable CORS policy on express backend to allow frontend to make requests to it
// Enable CORS for all routes
app.use(cors()); // Option 1 :cors(*) to allow all origins
// Option 2 :Only allow custom origins
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}))

// a middleware to parse the request body- middleware function in express framework sits between client request and server response
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
