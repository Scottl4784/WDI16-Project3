import React, { Component } from 'react'
import axios from 'axios'
import NewCommentForm from './NewCommentForm';

class CommentList extends Component {
    state = {
        comments: []
    }

    getMovieComments() {
        const userId = this.props.match.params.userId
        const movieId = this.props.match.params.movieId
        axios.get(`/api/users/${userId}/movies/${movieId}`)
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

    newComment = (comment) => {
        const newComment = [...this.state.comments]
        newComment.push(comment)
        this.setState({ comments: newComment })
    }
    deleteComment = (commentId) => {
        const userId = this.props.match.params.userId
        const movieId = this.props.match.params.movieId
        axios.delete(`/api/users/${userId}/movies/${movieId}/comments/${commentId}`).then((res) => {
            console.log()
            this.setState({comments: res.data.movie.comments})
        })
    }

    render() {
        return (
            <div>
                <div>
                    <NewCommentForm newComment={this.newComment} {...this.props}/>
                </div>
                <div>
                    {this.state.comments.map((comment, i) => {
                        return (
                            <div key={i}>
                                <h3>{comment.title}</h3>
                                <p>{comment.comment}</p>
                                <button onClick={() => {this.deleteComment(comment._id)}}>Remove Comment</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default CommentList;