import React, {useState, useEffect} from 'react';
import axios from 'axios'; 
import List from './SearchList';

/**
 * Function for filtering through all titles and authors in booklist. 
 * @returns Search field. By input: filtered book titles and/or authors appears that matches input in search field
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
         *Filters through book titles and authors in database 
         */
        const filteredBooks = search.length === 0 ? books : books.filter(books => books.title.toLowerCase().includes(search.toLowerCase()) || books.author.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='searchList'>
            <h3>Search for books or athors: </h3>
                <input 
                type="text"
                placeholder = "Search title or author"
                value ={search}
                onChange = {(e) => setSearch(e.target.value)}
                />
            <List books = {filteredBooks} />
        </div>
    )
}