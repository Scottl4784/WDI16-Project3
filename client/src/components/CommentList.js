import React, { Component } from 'react'
import axios from 'axios'

class CommentList extends Component {
    state = {
        comments: []
    }

    getMovieComments() {
        const userId = this.props.match.params.userId
        const movieId = this.props.match.params.movieId
        axios.get(`/api/users/${userId}/movies/${movieId}/comments`)
        .then((res) => {
            console.log(res.data.movie.comments)
            this.setState({
                comments: res.data.movie.comments,
            })
        })
    }

    componentDidMount() {
        this.getMovieComments()
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

export default CommentList;