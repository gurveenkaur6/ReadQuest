import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import Book from "./models/bookModel.js"

//  an instance of the Express application
const app = express();

// we need a middleware to parse the request body
app.use(express.json());

// route handler for the root URL (/), when a client makes a GET request to the route URL, the callback function is executed
app.get('/',(request, response)=>{
    console.log(request); //  the incoming HTTP request which contains information such as headers, query parameters, and request body.
    return response.status(664).send("ReadQuest is Work in Progress. Stay Tuned :)"); // the outging response sent to the client 
});

// route to insert a new book into the book shema 
app.post('/books', async (request, response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({message: "Send all required Fields: title, author, publishYear"});
        }
        // inserting a new book into the book shema 
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

// route to get all the books from the bookstore 
app.get('/books', async (request, response) =>{
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
        
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }

});

// route to get a specific book from the bookstore by id 
app.get('/books/:id', async (request, response) =>{
    try {
        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(200).json({
            count: book.length,
            data: book
        });
        
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }

});

// route to update an existing book 
app.put('/books/:id', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({message: "Send all required Fields: title, author, publishYear"});
        }

        const {id}= request.params;
        const result  = Book.findByIdAndUpdate(id, request.body);
        if(!result) {
            return response.status(400).send({message: "Book not found"});
        }
        return response.status(200).send({message: "Book updated successfully !"});
        
    } catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

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