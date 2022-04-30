import React from "react";
import axios from "axios";
import {AiFillDelete} from 'react-icons/ai';
import {MdEdit} from 'react-icons/md';
import './BookLibrary.css';


class BookLibrary extends React.Component {
  constructor(props) {
    super(props);

    console.log("book library");

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    axios(process.env.REACT_APP_SERVER_URL)
      .then((result) => this.setState({ books: result.data }))
      .catch((error) => console.log(error));
  }

  //RENDER FUNCTION DISPLAYS LIBRARY
  render() {
    //varible containing the url we want to output
    let books = this.state.books.map((book) => {

      //variable to display published date with only 4 digits
      let date = book.published.toString().substr(0,4)

      //Values of object together with a delete and edit-button
      return (
        <tr key={book.id}>
          <td>{book.author}</td>
          <td>{book.title}</td>
          <td>{date}</td>
          <td><MdEdit /></td>
          <td className="delete"><AiFillDelete /></td>
        </tr>
      );
    });
    console.log("render", this.state.books);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Title</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>{books}</tbody>
        </table>
      </div>
    );
  }
}

export default BookLibrary;
