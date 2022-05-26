import './BookLibrary.css';
import './SearchList.css';

/**
 * Searchlist function mapping through database
 * @param {string} books 
 * @returns list with books.id, books.author and books.title
 */
export default function SearchList({books}) {
    return (
        <div className="searchbar-container">
        <div className='searchList-container '><br />
            <div className='text-test'>Based on your search, these books are available: </div>
            <ul>
                {books.map(books => (
                    <li key = {books.id} id='searchedBook'>
                            <div className='id'> ID: {books.id}</div>
                            <div> {books.author}</div> 
                            <div> {books.title}</div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    )
}