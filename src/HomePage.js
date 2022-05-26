import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import "./BookLibrary.css";

/**
 * HomePage function maping out all books from database
 * using reload() to handle rendering problems
 * @returns <tablerow> All available books including athor, title, published, comment properties + Delete and edit function
 */
function HomePage(props) {
  const reload = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 3200);
  };


  /**
   * book variable containing:
   * table row elements with book id, author, title, date, foreignkey-> comment
   * delete function/button
   * edit function/button 
   * confirmation window at delete
   */
  let books = props.books.map((book) => {
    
    /**
     * variable to display published date with only 4 digits
     */
    let date = book.published.toString().substr(0, 4);

    return (
      <tr key={book.id}>
        <td>{book.id}</td>
        <td>{book.author}</td>
        <td>{book.title}</td>
        <td>{date}</td>
        <td>{book.the_comment}</td>

        <td className="edit">
          <Link to={"/edit/" + book.id} onClick={() => reload()}>
            <MdEdit />
          </Link>
        </td>
        <td className="delete">
          <Link
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this book?")
              ) {
                props.handleDelete(book.id);
              }
            }}
            to="/"
          >
            <AiFillDelete />
          </Link>
        </td>
      </tr>
    );
  });
  console.log("render", props.books);

  return (
    <div className="bookLibraryBox">
      <div id="head">ALL BOOKS AVAILABLE:</div>
      <table>
        <thead>
          <tr>
            <th>ID: </th>
            <th>Author</th>
            <th>Title</th>
            <th>Published</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>{books}</tbody>
      </table>
    </div>
  );
}
export default HomePage;
