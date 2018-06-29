import React, { Component } from 'react'
import axios from 'axios'
import NewCommentForm from './NewCommentForm';
import EditComment from './EditComment';

class CommentList extends Component {
    state = {
        comments: [],
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
        this.setState({ comments: comment })
    }
    deleteComment = (commentId) => {
        const userId = this.props.match.params.userId
        const movieId = this.props.match.params.movieId
        axios.delete(`/api/users/${userId}/movies/${movieId}/comments/${commentId}`).then((res) => {
            const singleMovie = res.data.user.movies.find((movie) => movie._id === movieId)
            this.setState({ comments: singleMovie.comments })
        })
            .catch((err) => {
                console.log(err)
            })
    }

    toggleEditComment = (i) => {
        const editComment = !this.state.comments[i].editComment
        this.setState({ editComment })
        console.log(this.state.comments[i].editComment)
    }

    render() {
        return (
            <div>
                <div>
                    <NewCommentForm newComment={this.newComment} {...this.props} />
                </div>
                <div>
                    {this.state.comments.map((comment, i) => {
                        return (
                            <div key={i}>
                                {comment.editComment ? <EditComment /> :
                                    <div>
                                        <h3>{comment.title}</h3>
                                        <p>{comment.comment}</p>
                                        <button onClick={() => { this.deleteComment(comment._id) }}>Remove Comment</button>
                                        <button onClick={() => {this.toggleEditComment(i)}}>Edit Comment</button>
                                    </div>}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default CommentList;