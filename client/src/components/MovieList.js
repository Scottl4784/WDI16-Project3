import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MovieSearch from './MovieSearch';
import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction: row;

`
const ListOfMovies = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 75%;
    img {
        width: 175px;
        height: 250px;
    }
`
const EachMovie = styled.div`
    margin: 5%;
    display: flex;
    flex-direction: column;
    button {
        background-color: #981717;
        border: none;
        color: white;
    }
`
const Heading = styled.div`
    padding: 0 0 0 18%;
`

class MovieList extends Component {
    state = {
        user: [],
        movies: [],
        searchResults: [],
        searchForMovie: false,
    }

    getMovies() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`)
            .then((res) => {
                this.setState({
                    user: res.data,
                    movies: res.data.movies,
                })
            })
    }

    componentDidMount() {
        this.getMovies()
    }


    newSearch = (results) => {
        this.setState({ searchResults: results })
    }

    newMovie = (movies) => {
        this.setState({ movies: movies })
        this.props.history.push()
    }
    deleteMovie = (movieId) => {
        const userId = this.props.match.params.userId
        axios.delete(`/api/users/${userId}/movies/${movieId}`).then((res) => {
            this.setState({ movies: res.data.user.movies })
        })
    }
       toggleSearch = () => {
        const searchForMovie = !this.state.searchForMovie
        this.setState({searchForMovie})
       }



    render() {
        return (
            <div>
                <Heading>
                    <h1>Your Movies</h1>
                </Heading>
                <Container>
                    <ListOfMovies>
                        {this.state.movies.map((movie, i) => {
                            return (
                                <EachMovie key={i}>
                                    <Link to={`/${this.state.user._id}/movies/${movie._id}`}>
                                        <img src={movie.Poster} alt="" />
                                    </Link>

                                    <button onClick={() => { this.deleteMovie(movie._id) }}>Remove Movie</button>
                                </EachMovie>
                            )
                        })}
                    </ListOfMovies>
                    <div>
                        <MovieSearch newMovie={this.newMovie} {...this.props} searchResults={this.newSearch} />
                    </div>
                </Container>
            </div>
        );
    }
}

export default MovieList;