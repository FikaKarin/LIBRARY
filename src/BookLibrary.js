import React from "react";
import axios from "axios";
import "./BookLibrary.css";
import HomePage from "./HomePage";
import Flashmessage from "./FlashMessage";

/**
 * Class for Booklibrary to delete a book, and render an updated list.
 * @constructor 
 * @returns updated book library list
 */
class BookLibrary extends React.Component {
  constructor(props) {

    /**
     * transfer the value of prop to the super() function from the constructor()
     */
    super(props);

    /**
     * @property {string, boolean, number} properties of class Booklibrary 
     * books array, loading page boolean, warning string, warning number.
     */
    this.state = {
      books: [],
      loading: false,
      error: false,
      warning: "",
      warningCount: 0,
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   */
  componentDidMount() {
    this.refresh();
  }

  /**
   * refresh function page with result
   * then() and catch() for result and error
   */
  refresh() {
    this.setState({ error: false, loading: true });

    axios(process.env.REACT_APP_SERVER_URL)
      .then((result) => this.setState({ loading: false, books: result.data }))
      .catch((error) => {
        this.setState({ error: true, loading: false });
      });
  }

  /**
   * This function sends delete request to server url with id target.
   * then() and catch() for result and error.
   * @param {string} id Book primary key id
   */
  handleDelete(id) {
    console.log("deleting test", id);

    axios
      .delete(process.env.REACT_APP_SERVER_URL + "/" + id)
      .then((result) => {
        this.refresh();
      })
      .catch((error) => {
        this.setState({
          warningCount: this.state.warningCount + 1,
          warning: "Delete failed..",
        });
      });
  }

  /**
   * This function renders and displays library so that the book list is updated    after alternations.
   * @returns content
   */
  render() {
    let content = "";

    if (this.state.loading) {
      content = <div className="error">Loading...</div>;
    } else if (this.state.error) {
      content = (
        <div className="error">An error occured, please try again...</div>
      );
    } else {
      content = (
        <div className="book-library-container">
          <div className="book-library">
            <Flashmessage
              key={this.state.warningCount}
              message={this.state.warning}
              duration="4000"
            />
            <HomePage
              books={this.state.books}
              handleDelete={this.handleDelete}
            />
          </div>
        </div>
      );
    }

    return content;
  }
}

export default BookLibrary;
