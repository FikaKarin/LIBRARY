import React from 'react';
import BookLibrary from './BookLibrary';
import Book from './Book';
import Header from './Header';
import './App.css';
import Welcome from './Welcome';
import Search from './SearchFunktion.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {

  return (

    <Router>
      <div className="App">
        <Header />
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
            <Search />
            <BookLibrary />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
