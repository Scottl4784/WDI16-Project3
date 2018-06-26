import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import UsersList from './components/UsersList';
import MovieList from './components/MovieList';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <Navbar />
          </div>
          <Switch>
            <Route exact path='/users' component={UsersList}/>
            <Route exact path='/:userId/movies' component={MovieList}/>
            <Route path='/' component={UsersList}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
