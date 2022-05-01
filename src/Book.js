import React from "react";
import "./Book.css";
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import FlashMessage from './FlashMessage';


class Book extends React.Component {

  validation = {
    author: {
      //checks that field starts and end with a non-space characters, have to have between 2-48 characters
      rule: /^\S.{0,48}\S$/,
      message: 'Author field must have 2-50 characters'
    },

    title: {
      //checks that field starts and end with a non-space characters, have to have between 2-70 characters
      rule: /^\S.{0,68}\S$/,
      message: 'Title field must have 2-70 characters'
    },

    published: {
      //checks that field it 4 digits
      rule: /^\d{4}\$/,
      message: 'Published date field must be a 4 digit year'
    }
  }

  //takes properties/attributes that can be passed in when we use Book component
  constructor(props) {
    super(props);

    console.log(props);

    //assigns to the state
    this.state = {
      id: props.match.params.is,
      author: '',
      title: '',
      published: '',
      submitAttempts: 0,
    }

    //binds the book objekt to the handlechange funktion
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.state.id) {
      return;
    }

    axios.get(process.env.REACT_APP_SERVER_URL + '/' + this.state.id)
    .then(result => {
      

      let { author, title, published } = result.data[0];
      console.log(author, title, published);

      this.setState({
        author: author,
        title: title,
        published: published.substr(0, 4)
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  validate() {
    for(let field in this.validation) {
      const rule = this.validation[field].rule;
      const message = this.validation[field].message;
      const value = this.state[field];

      //when a rule does not match
      if(!value.match(rule)) {
        this.setState({ message: message, submitAttempts: this.state.submitAttempts + 1 });
        return false;
      }
    }

    // return true;
  }

  handleSubmit(event) {

     //stops the form from submitting/parameters will not appear in url. Output will appear in state.
    event.preventDefault();

    if(!this.validate()) {
      return;
    }

    let { author, title, published } = this.state;

    published += '-01-01'

    const book = {
      author: author,
      title: title,
      published: published,
    }

    //submitting to url, to book  data
    axios.post(process.env.REACT_APP_SERVER_URL, book)
    .then(result => {
      //flag to check if true in render function
      this.setState({ created: true});
    })
    .catch(error=>{
      console.log(error);
    });
  }

  //handles input controle
  handleChange(event) {

    //controles 
    const name = event.target.name;
    const value = event.target.value;
    

    this.setState({
      [name]: value
    });
  }

  render() {
    const reload = () => {
      setTimeout(() => {
        window.location.reload(false);
      }, 100);
  };

    //if the state is created --> redirect to homepage
    if(this.state.created) {
      return <Redirect to="/" onClick={() => reload()} />
   
    }

    //Form for saving a new book
    //Gets text out of the controle
    //Value will be the corresponfding property
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="author">Author:</label>
          <input value={this.state.author} onChange={this.handleChange} type="text" name="author" id="author" />
          <label htmlFor="title">Title:</label>
          <input value={this.state.title} onChange={this.handleChange} type="text" name="title" id="title" />
          <label htmlFor="author">Published:</label>
          <input value={this.state.published} onChange={this.handleChange} type="text" name="published" id="published" />
          <input type="submit" value="Save" />
          {/* key makes flashmessage re-rendered every time validationmessage changes */}
          <FlashMessage key={this.state.submitAttempts} message={this.state.message} duration= "3000" />

        </form>
      </div>
    );
  }
}

export default withRouter(Book);
