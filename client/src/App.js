import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar';
import UsersList from './components/UsersList';
import MovieList from './components/MovieList';
import IndividualMovie from './components/IndividualMovie';
import CommentList from './components/CommentList';

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
            <Route exact path='/:userId/movies/:movieId' component={IndividualMovie}/>
            <Route exact path='/:userId/movies/:movieId/comments' component={CommentList}/>
            <Route path='/' component={UsersList}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
