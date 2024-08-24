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
  const [pubishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);

  // sets up navigation to allow component CreateBooks to change pages
  const navigate = useNavigate();

  // function to save the newly created book
  const handleSaveBook = ()=>{

    // create an object with the book's information
    const data = {
      title, 
      author, 
      publishYear
    };
    setLoading(true);
    // using axios to send the book data to the server at port 5555/books
    axios
      .post("http://localhost:5555/books")
      // if successfully sent, navigate back to home page
      .then(()=>{
        setLoading(false);
        navigate('/'); 
      })
      // else, alert the user of the error and log the error in the console
      .catch((error)=>{
        setLoading(false);
        alert("An error hhappened ! Please check console");
        console.log(error);
      });
  };
  // this is what the component displays
  return (
    <div>CreateBooks</div>
  )
}

export default CreateBooks