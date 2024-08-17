// import React from 'react'
import {useEffect, useState} from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {AiOutlineEDit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';

const Home = () => {
    const [books, setBooks] = useState([]); // holds a list of books fetched from the API
    const [loading, setLoading] = useState(false); // indicates whether the data is currently being loaded from the API

    // useEffect hook is used to perform the sideEffect of fetching the data from an API
    useEffect(()=> {
        setLoading(true); // data is being fetched, so loading is set to true
        axios // axios is an http client that makes a request to the specified URL
        .get('http://localhost:5555/books') 
        // handle the response
        .then((response) => { // if request is successful, response.data.data that contains the 'count' and 'books' is assigned to books state using setBooks
            setBooks(response.data.data);
            setLoading(false)
        })
        .catch((error)=>{ // if request failed, error is logged to the console
            console.log(error);
            setLoading(false);
        });
    }, []); // [] is an empty dependency array for the useEffect hook, means this effect will run only once, right after the initial render
  return (
    <div className='p-4'>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Books List</h1>
            <Link to='/books/create'>
                <MdOutlineAddBox className='text-sky-800 text-4xl'></MdOutlineAddBox>
            </Link>
        </div>
        {loading ? (
             <Spinner></Spinner>
        ) : (
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No.</th>
                        <th className='border border-slate-600 rounded-md'>Title</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Author</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Publish Year</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book,index)=> (
                        <tr key={book._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'> {index+1}</td>
                            <td className='border border-slate-700 rounded-md text-center'> {book.title}</td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'> {book.author}</td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'> {book.publishYear}</td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/books/details/${book._id}`}> 
                                        <BsInfoCircle className='text-2xl text-green-800'></BsInfoCircle>
                                    </Link>
                                    <Link to={`/books/edits/${book._id}`}> 
                                        <AiOutlineEDit className='text-2xl text-yellow-600'></AiOutlineEDit>
                                    </Link>
                                    <Link to={`/books/delete/${book._id}`}> 
                                        <MdOutlineDelete className='text-2xl text-red-600'></MdOutlineDelete>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
      
    </div>
  )
}

export default Home
