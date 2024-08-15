import express from "express";
import Book from '../models/bookModel.js';

const router = express.Router();


// route to insert a new book into the book shema
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({
          message: "Send all required Fields: title, author, publishYear",
        });
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
    response.status(500).send({ message: error.message });
  }
});

// route to get all the books from the bookstore
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// route to get a specific book from the bookstore by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json({
      count: book.length,
      data: book,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// route to update an existing book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({
          message: "Send all required Fields: title, author, publishYear",
        });
    }

    const { id } = request.params;
    const result = Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(400).send({ message: "Book not found" });
    }
    return response
      .status(200)
      .send({ message: "Book updated successfully !" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// route to delete a book by id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(400).send({ message: "Book not found" });
    }
    return response
      .status(200)
      .send({ message: "Book Deleted Successfully !" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Export the router
export default router;
