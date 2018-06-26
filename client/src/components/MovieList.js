import React, { Component } from 'react'
import axios from 'axios'

class MovieList extends Component {
    state = {
        user: {},
        movies: []
    }

    getMovies() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`)
        .then((res) => {
            console.log(res.data)
            this.setState({
                user: res.data,
                movies: res.data.movies
            })
        })
    }

    componentDidMount() {
        this.getMovies()
    }

    render() {
        return (
            <div>
                {this.state.movies.map((movie, i) => {
                    return (
                        <div key={i}>
                        <h3>Title: {movie.title}</h3>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default MovieList;