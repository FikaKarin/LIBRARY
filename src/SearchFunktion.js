import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import List from './SearchList';

/**
 * Function for filtering through all titles in booklist. 
 * @returns Search field. By input: filtered book titles appear that matches input in search field
 */
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

        /**
         *Filters through book titles in database 
         */
        const filteredBooks = search.length === 0 ? books : books.filter(books => books.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='searchList'>
            <h3>Search for books: </h3>
                <input 
                type="text"
                placeholder = "Search name"
                value ={search}
                onChange = {(e) => setSearch(e.target.value)}
                />
            <List books = {filteredBooks} />
        </div>
    )
}