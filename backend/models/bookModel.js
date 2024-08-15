import mongoose from 'mongoose';

// Define the schema
const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String, 
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Create the model using the schema
const Book = mongoose.model('Book', BookSchema);

export default Book;
