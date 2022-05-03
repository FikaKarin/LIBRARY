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
            submitAttempts: 0,
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
                let { author, title, published}  = result.data[0];

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

    errorMessage(message) {
        this.setState({ message: message, submitAttempts: this.state.submitAttempts + 1 });
    }

    //function that uses error messages from validation object if input fields in Create is not entered correct
    validate() {
        for (let field in this.validation) {
            const rule = this.validation[field].rule;
            const message = this.validation[field].message;
            const value = this.state[field];

            if (!value.match(rule)) {
                this.errorMessage(message);
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

        let { id, author, title, published } = this.state;

        published += '-01-01';

        const book = {
            id: id,
            author: author,
            title: title,
            published: published,
        }

        let updateFunc = axios.post;
        let url = process.env.REACT_APP_SERVER_URL;

        if(id) {
            updateFunc = axios.put;
            url += '/' + id;
        }

        updateFunc(url, book)
            .then(result => {
                this.setState({ created: true });
            })
            .catch(error => {
                this.errorMessage(error.toString());
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
                    <input type="submit" value="Save" onClick={() => reload()} />
                    <FlashMessage key={this.state.submitAttempts} message={this.state.message} duration='3000' />
                </form>


            </div>
        );
    }
}

export default withRouter(Book);