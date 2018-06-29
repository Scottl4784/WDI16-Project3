import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar';
import UsersList from './components/UsersList';
import MovieList from './components/MovieList';
import IndividualMovie from './components/IndividualMovie';
import CommentList from './components/CommentList';
import styled from 'styled-components'

const Body = styled.div`
    padding: 25px 0;
    width: 100%;
    position: absolute;
    background-color: gray;
    background-size: cover;
`

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <Navbar />
          </div>
          <Body>
          <Switch>
            <Route exact path='/users' component={UsersList}/>
            <Route exact path='/:userId/movies' component={MovieList}/>
            <Route exact path='/:userId/movies/:movieId' component={IndividualMovie}/>
            <Route exact path='/:userId/movies/:movieId/comments' component={CommentList}/>
            <Route path='/' component={UsersList}/>
          </Switch>
          </Body>
        </div>
      </Router>
    );
  }
}

export default App;
