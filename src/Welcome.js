import React from 'react';
import './BookLibrary.css';
import Shelf from './images/shelf.png';

function Welcome() {

  return (
    <div className='backgroundDiv'>
      <img src= {Shelf} alt="shelf"/>
    <div id="welcome">
      <div id='welcomeBorder'>
        <h1 >WELCOME TO HOOD BOOK<br></br><div id='subTitleWelcome'> 
        Your free neighboor hood book store by Hammarbyhöjdens T-bana
        </div></h1>
        <br></br>
        </div>
        <div>
        <h2>- Leave a book (in the bookshelf by the subway station)</h2>
        <h2>- You can search for a specific title in <a href="./view">View all</a></h2>
        <h2>- Add a book (click on Add in the meny above)</h2>
        <h2 id='pleaseDelete'>- Please DELETE the book from this list when you pick it out of the shelf</h2>
        </div>
    </div>
    </div>
  );
}

export default Welcome;
