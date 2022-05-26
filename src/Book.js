import React from "react";
import "./Book.css";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import FlashMessage from "./FlashMessage";

/**
 * Class for entering new book into database.
 * @property {string} author field must have 2-50 characters
 * @property {string} title field must have 2-70 characters
 * @property {number} published date must be a 4-digit year
 * @property {string} the_comment foreign key value, comment on book from user
 * @constructor
 * @returns form input fields
 */
class Book extends React.Component {
  /**
   * Validation object for input values
   * @type {validation}
   */
  validation = {
    author: {
      rule: /^\S.{0,48}\S$/,
      message: "Author field must have 2-50 characters",
    },

    title: {
      rule: /^\S.{0,68}\S$/,
      message: "Title field must have 2-70 characters",
    },

    published: {
      rule: /^\d{4}$/,
      message: "Published date must be a 4-digit year",
    },

    the_comment: {
      rule: /^\S.{0,250}\S$/,
      message: "Comment field must have 2-250 characters",
    },
  };

  /**
   * takes properties/attributes that can be passed in when we use Book component
   * @param {*} props
   */
  constructor(props) {
    super(props);

    /**
     * assigns value to state
     */
    this.state = {
      id: props.match.params.id,
      author: "",
      title: "",
      published: "",
      the_comment: "",
      warningCount: 0,
    };

    /**
     * Binds the book objekt to the handlechange function
     */
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Function that checks that the input has been recieved from input
   * @axios
   * @then
   * @catch
   * @return if object does not have id
   */
  componentDidMount() {
    if (!this.state.id) {
      return;
    }

    axios
      .get(process.env.REACT_APP_SERVER_URL + "/" + this.state.id)
      .then((result) => {
        let { author, title, published, the_comment } = result.data[0];

        this.setState({
          author: author,
          title: title,
          published: published.substr(0, 4),
          the_comment: the_comment,
        });
      })
      .catch((error) => {
        this.warning("Unable to load book");
      });
  }

  /**
   * Warning function with set parameter of string value in message when unable to load new book
   * @param {string} message
   */
  warning(message) {
    this.setState({
      message: message,
      warningCount: this.state.warningCount + 1,
    });
  }

  /**
   * Function that uses error messages from validation object if input fields in <Create> is not entered correct
   * @returns true or false
   */
  validate() {
    for (let field in this.validation) {
      const rule = this.validation[field].rule;
      const message = this.validation[field].message;
      const value = this.state[field];

      /**
       * If vlaue does not match rule of validation, show warning message
       */
      if (!value.match(rule)) {
        this.warning(message);
        return false;
      }
    }

    return true;
  }

  /**
   * Function for submit-button that handles changes if fields is validated, or not
   * Stops the form from submitting/parameters will not appear in url. Output will appear in state.
   * @param {*} event
   * @returns
   */
  handleSubmit(event) {
    event.preventDefault();

    if (!this.validate()) {
      return;
    }

    let { id, author, title, published, the_comment } = this.state;

    published += "-01-01";

    const book = {
      id: id,
      author: author,
      title: title,
      published: published,
      the_comment: the_comment,
    };

    let updateFunc = axios.post;
    let url = process.env.REACT_APP_SERVER_URL;

    if (id) {
      updateFunc = axios.put;
      url += "/" + id;
    }

    console.log(book);

    /**
     * Function for updating values of book
     * Catching errors with warning <string>
     */
    updateFunc(url, book)
      .then((result) => {
        this.setState({ created: true });
      })
      .catch((error) => {
        this.warning("Unable to save book");
      });
  }
  
  /**
   * handles input controle for name and value
   * @param {*} event name, value
   */
  handleChange(event) {

    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  /**
   * Render function with reload() after 2.8 sec
   * Gets text out of the controle
   * Value will be the corresponfding property
   * Key makes flashmessage re-rendered every time validationmessage changes
   * When new book is created, redirect to homepage
   * @returns Form for saving a new book with input fields for author, title, published, comment, save-button
   */
  render() {
    const reload = () => {
      setTimeout(() => {
        window.location.reload(false);
      }, 2800);
    };

 
    if (this.state.created) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h1>ADD A BOOK</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="author">Author:</label>
          <input
            value={this.state.author}
            onChange={this.handleChange}
            type="text"
            name="author"
            id="author"
          />
          <label htmlFor="title">Title:</label>
          <input
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
            name="title"
            id="title"
          />
          <label htmlFor="published">Published:</label>
          <input
            value={this.state.published}
            onChange={this.handleChange}
            type="text"
            name="published"
            id="published"
          />
          <label htmlFor="comment"></label>
          <h5>Comment from previous reader:</h5>
          <h3> </h3>
          <textarea
            value={this.state.the_comment}
            onChange={this.handleChange}
            type="text"
            name="the_comment"
            id="comment"
          />
          <input
            class="button-52"
            type="submit"
            value="Save"
            onClick={() => reload()}
          />
          <FlashMessage
            key={this.state.warningCount}
            message={this.state.message}
            duration="3000"
          />
        </form>
      </div>
    );
  }
}

export default withRouter(Book);
