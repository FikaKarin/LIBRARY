import React from 'react';
import BookLibrary from './BookLibrary';
import Book from './Book';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import Welcome from './Welcome';
import Search from './SearchFunktion.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * All routes in App
 * Header (navbar)
 * BookLibrary (all books)
 * Book (adding book)
 * Book (edits by id)
 * @returns paths to components as pages
 */
function App() {

  return (

    <Router>
      <div className="App">
        <Header />
        <Footer />
        <Switch>
          <Route exact path="/">
            <Welcome />
            <BookLibrary />
          </Route>
          <Route path="/create">
            <Book />
          </Route>
          <Route path="/edit/:id">
            <Book />
          </Route>
          <Route path="/view">
            <BookLibrary />
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
