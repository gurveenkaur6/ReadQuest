// import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBooks = () => {
  // define state variabes - they hold book's title, author, publishYear and loading status
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  // sets up navigation to allow component CreateBooks to change pages
  const navigate = useNavigate();

  // function to save the newly created book
  const handleSaveBook = () => {
    // create an object with the book's information
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    // using axios to send the book data to the server at port 5555/books
    axios
      .post("http://localhost:5555/books", data)
      // if successfully sent, navigate back to home page
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      // else, alert the user of the error and log the error in the console
      .catch((error) => {
        setLoading(false);
        alert("An error hhappened ! Please check console");
        console.log(error);
      });
  };
  // this is what the component displays
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input 
            type = "text" 
            value = {title} 
            // OnChange is triggered whenever the input changes
            onChange={(e)=> setTitle(e.target.value)} // e.target.value is accessing the current value of the input field
            className="border-2 border-gray-500 px-4 py-2 w-full" 
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input 
            type = "text" 
            value = {author} 
            // OnChange is triggered whenever the input changes
            onChange={(e)=> setAuthor(e.target.value)} // e.target.value is accessing the current value of the input field
            className="border-2 border-gray-500 px-4 py-2 w-full" 
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input 
            type = "text" 
            value = {publishYear} 
            // OnChange is triggered whenever the input changes
            onChange={(e)=> setPublishYear(e.target.value)} // e.target.value is accessing the current value of the input field
            className="border-2 border-gray-500 px-4 py-2 w-full" 
          />
        </div>
        <button className="p-2 bg-sky-500 m-8" onClick={handleSaveBook}>Save</button>
      </div>
    </div>
  );
};

export default CreateBooks;
