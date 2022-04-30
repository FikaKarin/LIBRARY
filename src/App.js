import React from "react";
import BookLibrary from "./BookLibrary";
import Book from './Book';
import Header from "./Header";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (

    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/" component={BookLibrary} />
            
          
          <Route path="/create" component={Book} />
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
