import React from 'react';
import './BookLibrary.css';
import Shelf from './images/shelf.png';

/**
 * Welcome function as homepage component
 * @returns Homepage oriantation links, text and image
 */
function Welcome() {

  return (
    <div className='backgroundDiv'>
      <img src= {Shelf} alt="shelf"/>
    <div id="welcome">
      <div id='welcomeBorder'>
        <h1 >WELCOME TO HOOD BOOK<br></br><div id='subTitleWelcome'> 
        Your free neighboorhood book store by Hammarbyhöjdens T-bana
        </div></h1>
        <br></br>
        </div>
        <div>
        <h2>- Leave a book (in the bookshelf by the subway station)</h2>
        <h2>- You can search for a specific title in <a href="./view">View all</a> before heading to the shelf</h2>
        <h2>- <a href="./create">Add</a> a book and leave a helpful comment to the next reader </h2>
        <h2 id='pleaseDelete'>- Please DELETE the book from this list when you pick it out of the shelf</h2>
        </div>
    </div>
    </div>
  );
}

export default Welcome;
