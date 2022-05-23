import React from "react";
import axios from "axios";
import './BookLibrary.css';
import HomePage from "./HomePage";
import Flashmessage from './FlashMessage'; 

/**
 * Class for Booklibrary 
 * contaning book array
 * handleing delete request, error, fails, warnings
 */
class BookLibrary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      loading: false,
      error: false,
      warning: '',
      warningCount: 0
    };

    this.handleDelete = this.handleDelete.bind(this);
  }
  
  //Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    this.refresh();
}
  //refresh function page with result
  refresh() {

    this.setState({ error: false, loading: true});

    axios(process.env.REACT_APP_SERVER_URL)
    .then(result => this.setState({ loading: false, books: result.data }))
    .catch(error => {
      this.setState({ error: true, loading: false });
    });
  }

  //send delete req to server url with id target + error catch
  handleDelete(id) {
    console.log('deleting test', id);

    axios.delete(process.env.REACT_APP_SERVER_URL + '/' + id)
      .then(result => {
        this.refresh();
      })
      .catch(error => {
        this.setState({
          warningCount: this.state.warningCount + 1,
          warning: 'Delete failed..',
        })
      })
  }

  //RENDER FUNCTION DISPLAYS LIBRARY
  render() {

    let content = '';

    if(this.state.loading) {
        content = <div className="error">Loading...</div>
    } 
    else if(this.state.error) {
        content = <div className="error">An error occured, please try again...</div>
    } 
    else {
        content = 
        (
          <div className="book-library-container">
          <div className="book-library">
            <Flashmessage key={this.state.warningCount} message={this.state.warning} duration="4000" />
            <HomePage books={this.state.books} handleDelete={this.handleDelete} />
          </div>
          </div>
        );
    }

    return content;
  }
}

export default BookLibrary;
