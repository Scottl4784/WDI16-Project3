import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NewMovieForm from './NewMovieForm';
import MovieSearch from './MovieSearch';
import styled from 'styled-components'

const EachMovie = styled.div`
img {
    width: 100px;
}
`

class MovieList extends Component {
    state = {
        user: [],
        movies: [],
        searchResults: []
    }

    getMovies() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`)
            .then((res) => {
                console.log()
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
        this.setState({searchResults: results})
    }

    newMovie = (movies) => {
        this.setState({ movies: movies })
        this.props.history.push()
        console.log(movies)
    }
    deleteMovie = (movieId) => {
        const userId = this.props.match.params.userId
        axios.delete(`/api/users/${userId}/movies/${movieId}`).then((res) => {
            console.log(res.data.user.movies)
            this.setState({movies: res.data.user.movies})
        })
    }
    


    render() {
        return (
            <div>
                <div>
                    {/* <NewMovieForm newMovie={this.newMovie} {...this.props} /> */}
                    <MovieSearch newMovie={this.newMovie} {...this.props} searchResults={this.newSearch}/>
                </div>
                <div>
                    {this.state.movies.map((movie, i) => {
                        return (
                            <EachMovie key={i}>
                                <img src={movie.Poster} alt=""/>
                                <img src={movie.image} alt="" />
                                <Link to={`/${this.state.user._id}/movies/${movie._id}`}><h3>{movie.Title}</h3></Link>
                                <button onClick={() => {this.deleteMovie(movie._id)}}>Remove Movie</button>
                            </EachMovie>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default MovieList;