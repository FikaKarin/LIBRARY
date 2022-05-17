import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import List from './SearchList';

export default function Search() {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')
    

    useEffect(() => {
        const API_URL = 'http://localhost:3000/books'
        axios
            .get(API_URL)
            .then(res => {
                const books = res.data
                setBooks(books)
            })
    }, [])

    const filteredBooks = search.length === 0 ? books : books.filter(books => books.title.toLowerCase().includes(search.toLowerCase()))

    // const filteredAuthor = search.length === 0 ? books : books.filter(books => books.author.toLowerCase().includes(search.toLowerCase()))


    return (
        <div className='searchList'>
            <h3>Search for books: </h3>
                <input 
                type="text"
                placeholder = "Search name"
                value ={search}
                onChange = {(e) => setSearch(e.target.value)}
                />
            {/* Books array passed down to List */}
            <List books = {filteredBooks} />
        </div>
    )
}