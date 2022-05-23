import './BookLibrary.css';
import './SearchList.css';

/**
 * Searchlist function mapping through database
 * @param {string} 
 * @returns books.id, books.author and books.title
 */
export default function SearchList({books}) {
    return (
        <div><br />
            <div>Based on your search, these books are available: </div>
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
    )
}