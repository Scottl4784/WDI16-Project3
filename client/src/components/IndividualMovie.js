import React, { Component } from 'react';
import axios from 'axios'

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
        return (
            <div>
                {this.state.comments.map((comment, i) => {
                    return (
                        <div key={i}>
                            <h3>{comment.title}</h3>
                            <p>{comment.comment}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default IndividualMovie;