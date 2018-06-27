import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import NewMovieForm from './NewMovieForm';

class MovieList extends Component {
    state = {
        user: [],
        movies: [],
    }

    getMovies() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`)
            .then((res) => {
                console.log(res.data.movies)
                this.setState({
                    user: res.data,
                    movies: res.data.movies,
                })
            })
    }

    newMovie = (movie) => {
        const newMovie = [...this.state.movies]
        newMovie.push(movie)
        this.setState({ movies: newMovie })
    }

    componentDidMount() {
        this.getMovies()
    }

    render() {
        return (
            <div>
                <div>
                    <NewMovieForm newMovie={this.newMovie} {...this.props} />
                </div>
                <div>
                    {this.state.movies.map((movie, i) => {
                        return (
                            <div key={i}>
                                <img src={movie.image} alt="" />
                                <Link to={`/${this.state.user._id}/movies/${movie._id}`}><h3>{movie.title}</h3></Link>
                                <p>{movie.summary}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default MovieList;