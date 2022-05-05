import React from "react";
import {AiFillDelete} from 'react-icons/ai';
import {MdEdit} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './BookLibrary.css';

function HomePage(props) {
    const reload = () => {
        setTimeout(() => {
          window.location.reload(false);
        }, 2200);
    };
      //varible containing the url we want to output
      let books = props.books.map((book) => {
  
        //variable to display published date with only 4 digits
        let date = book.published.toString().substr(0,4)
  
        //Values of object together with a delete and edit-button
        //+ reload()
        return (
          <tr key={book.id}>
            <td>{book.author}</td>
            <td>{book.title}</td>
            <td>{date}</td>
            <td className="edit"><Link to={'/edit/' + book.id} onClick={() => reload()}><MdEdit /></Link></td>
            <td className="delete"><Link onClick={() => { if(window.confirm('Are you sure you want to delete this book?') ) {props.handleDelete(book.id)} }} to='/' ><AiFillDelete /></Link></td>
          </tr>
        );
      });
      console.log("render", props.books);
      return (
          <table>
            <thead>
              <tr>
                <th>Author</th><th>Title</th><th>Published</th></tr>
            </thead>
            <tbody>{books}</tbody>
          </table>
      );
}
export default HomePage;