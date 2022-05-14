import React from 'react';
import './BookLibrary.css'

function Welcome() {

  return (

    <div id="welcome">
        <h1 >Welcome to The Neighboorhood Library by Hammarbyhöjdens T-bana</h1>
        <h2>- Leave a book (in the bookshelf)</h2>
        <h2>- Add a book (click on Add in the meny above)</h2>
        <h2 id='pleaseDelete'>- Please DELETE the book from this list when you pick it out of the shelf</h2>

    </div>
  );
}

export default Welcome;
