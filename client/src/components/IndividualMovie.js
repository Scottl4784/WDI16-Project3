import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class IndividualMovie extends Component {
    state = {
        user: {},
        movie: [],
        comments: []
    }

    getMovie() {
        const userId = this.props.match.params.userId
        const movieId = this.props.match.params.movieId
        axios.get(`/api/users/${userId}/movies/${movieId}`)
        .then((res) => {
            console.log(res.data)
            this.setState({
                user: res.data,
                movie: res.data.movie,
                comments: res.data.movie.comments,
            })
        })
    }

    componentDidMount() {
        this.getMovie()
    }

    render() {
        const userId = this.props.match.params.userId
        const movieId = this.state.movie._id
        return (
            <div>
                <h2>{this.state.movie.Title}</h2>
                <img src={this.state.movie.Poster} alt=""/>
                <p>{this.state.movie.Director}</p>
                <p>{this.state.movie.Plot}</p>
                <p>{this.state.movie.Rated}</p>
                <p>{this.state.movie.Year}</p>
                <Link to={`/${userId}/movies/${movieId}/comments`} comments={this.state.comments}>Comments</Link>
            </div>
        );
    }
}

export default IndividualMovie;