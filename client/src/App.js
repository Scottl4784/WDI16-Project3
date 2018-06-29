import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar';
import UsersList from './components/UsersList';
import MovieList from './components/MovieList';
import IndividualMovie from './components/IndividualMovie';
import CommentList from './components/CommentList';
import styled from 'styled-components'


const Body = styled.div`
    width: 70%;
    height: 100%;
    position: absolute;
    background-color: #333f4b;
    background-size: cover;
    margin: 0 15%;
    a {
      color: inherit;
      text-decoration: none;
    }
`

class App extends Component {
  render() {
    return (
      <Router>
        <Body>
          <div>
            <Navbar {...this.props} />
          </div>
          <div>
            <Switch>
              <Route exact path='/users' component={UsersList} />
              <Route exact path='/:userId/movies' component={MovieList} />
              <Route exact path='/:userId/movies/:movieId' component={IndividualMovie} />
              <Route exact path='/:userId/movies/:movieId/comments' component={CommentList} />
              <Route path='/' component={UsersList} />
            </Switch>
          </div>
        </Body>
      </Router>
    );
  }
}

export default App;
