// import React from 'react'
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

// home page
const Home = () => {
  const [books, setBooks] = useState([]); // holds a list of books fetched from the API
  const [loading, setLoading] = useState(false); // indicates whether the data is currently being loaded from the API

  // useEffect hook is used to perform the sideEffect of fetching the data from an API
  useEffect(() => {
    setLoading(true); // data is being fetched, so loading is set to true
    axios // axios is an http client that makes a request to the specified URL
      .get("http://localhost:5555/books")
      // handle the response
      .then((response) => {
        // if request is successful, response.data.data that contains the 'count' and 'books' is assigned to books state using setBooks
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        // if request failed, error is logged to the console
        console.log(error);
        setLoading(false);
      });
  }, []); // [] is an empty dependency array for the useEffect hook, means this effect will run only once, right after the initial render
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl"></MdOutlineAddBox>
        </Link>
      </div>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <BooksTable books = {books}/>
      )}
    </div>
  );
};

export default Home;
