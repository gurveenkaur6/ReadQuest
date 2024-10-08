// import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

// Similar to create book but we fetch the book to be modified using its id from the backend
const EditBook = () => {
  // define the state variables
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams(); // to access the id parameter from the current url

  // set up navigation
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); // data is being fetched
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setTitle(response.data.title)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [id]);

  // function to save the newly created book
  const handleEditBook = () => {
    // create an object with the book's information
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    // using axios to send the book data to the server at port 5555/books
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      // if successfully sent, navigate back to home page
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully !', {variant: 'success'});
        navigate("/");
      })
      // else, alert the user of the error and log the error in the console
      .catch((error) => {
        setLoading(false);
        // alert("An error hhappened ! Please check console");
        enqueueSnackbar('Error', {variant: 'error'});
        console.log(error);
      });
  };

  // this is what the component displays
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            // OnChange is triggered whenever the input changes
            onChange={(e) => setTitle(e.target.value)} // e.target.value is accessing the current value of the input field
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            // OnChange is triggered whenever the input changes
            onChange={(e) => setAuthor(e.target.value)} // e.target.value is accessing the current value of the input field
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            // OnChange is triggered whenever the input changes
            onChange={(e) => setPublishYear(e.target.value)} // e.target.value is accessing the current value of the input field
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-500 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
