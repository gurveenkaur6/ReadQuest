// import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

// Similar to create book but we fetch the book to be modified using its id from the backend
const EditBook = () => {

  // define the state variables
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  
  return (
    <div>EditBook</div>
  )
}

export default EditBook