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

    newMovie = (movies) => {
        this.setState({ movies: movies })
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
                    <NewMovieForm newMovie={this.newMovie} {...this.props} />
                </div>
                <div>
                    {this.state.movies.map((movie, i) => {
                        return (
                            <div key={i}>
                                <img src={movie.image} alt="" />
                                <Link to={`/${this.state.user._id}/movies/${movie._id}`}><h3>{movie.title}</h3></Link>
                                <button onClick={() => {this.deleteMovie(movie._id)}}>Remove Movie</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default MovieList;