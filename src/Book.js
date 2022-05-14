import React from 'react';
import './Book.css';
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import FlashMessage from './FlashMessage';

class Book extends React.Component {
    //author -checks that field starts and end with a non-space characters, have to have between 2-48 characters
    //title - checks that field starts and end with a non-space characters, have to have between 2-70 characters
    //published - checks that field it 4 digits
    validation = {
        author: {
            rule: /^\S.{0,48}\S$/,
            message: 'Author field must have 2-50 characters'
        },

        title: {
            rule: /^\S.{0,68}\S$/,
            message: 'Title field must have 2-70 characters'
        },

        published: {
            rule: /^\d{4}$/,
            message: 'Published date must be a 4-digit year'
        },
        the_comment: {
            rule: /^\S.{0,250}\S$/,
            message: 'Comment field must have 2-250 characters'
        }
    }

    //takes properties/attributes that can be passed in when we use Book component
    constructor(props) {
        super(props);

        //assigns to the state
        this.state = {
            id: props.match.params.id,
            author: '',
            title: '',
            published: '',
            the_comment: '',
            warningCount: 0,
        }
        //binds the book objekt to the handlechange funktion
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

  //function that checks that the input has been recieved from input
    componentDidMount() {
        if (!this.state.id) {
            return;
        }

        axios.get(process.env.REACT_APP_SERVER_URL + '/' + this.state.id)
            .then(result => {
                let { author, title, published, the_comment}  = result.data[0];

                this.setState({
                    author: author,
                    title: title,
                    published: published.substr(0, 4),
                    the_comment: the_comment
                });
            })
            .catch(error => {
                this.warning("Unable to load book");
            });
    }

    warning(message) {
        this.setState({ message: message, warningCount: this.state.warningCount + 1 });
    }

    //function that uses error messages from validation object if input fields in Create is not entered correct
    validate() {
        for (let field in this.validation) {
            const rule = this.validation[field].rule;
            const message = this.validation[field].message;
            const value = this.state[field];

            if (!value.match(rule)) {
                this.warning(message);
                return false;
            }
        }

        return true;
    }

    //function for submit-button that handles changes if fields is validated
    handleSubmit(event) {
        //stops the form from submitting/parameters will not appear in url. Output will appear in state.
        event.preventDefault();

        if (!this.validate()) {
            return;
        }

        let { id, author, title, published, the_comment } = this.state;

        published += '-01-01';

        const book = {
            id: id,
            author: author,
            title: title,
            published: published,
            the_comment: the_comment
        }

        let updateFunc = axios.post;
        let url = process.env.REACT_APP_SERVER_URL;

        if(id) {
            updateFunc = axios.put;
            url += '/' + id;
        }

        console.log(book)

        updateFunc(url, book)
            .then(result => {
                this.setState({ created: true });
            })
            .catch(error => {
                this.warning("Unable to save book");
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
            }, 1200);
        };

        //if the state is created --> redirect to homepage
        if (this.state.created) {
            return <Redirect to='/' />;
        }
        //Form for saving a new book
        //Gets text out of the controle
        //Value will be the corresponfding property
        //key makes flashmessage re-rendered every time validationmessage changes
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="author">Author:</label>
                    <input value={this.state.author} onChange={this.handleChange} type="text" name="author" id="author" />
                    <label htmlFor="title">Title:</label>
                    <input value={this.state.title} onChange={this.handleChange} type="text" name="title" id="title" />
                    <label htmlFor="published">Published:</label>
                    <input value={this.state.published} onChange={this.handleChange} type="text" name="published" id="published" />
                    <label htmlFor="comment"></label>
                    <h5>Comment from previous reader:</h5>
                    <h3></h3>
                    <textarea value={this.state.the_comment} onChange={this.handleChange} type="text" name="the_comment" id="comment" />
                    <input type="submit" value="Save" onClick={() => reload()} />
                    <FlashMessage key={this.state.warningCount} message={this.state.message} duration='3000' />
                </form>


            </div>
        );
        
        // <input type="submit" value="Save" onClick={() => reload()} />
    }
}

export default withRouter(Book);