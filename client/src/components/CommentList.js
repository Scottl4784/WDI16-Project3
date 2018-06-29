import React, { Component } from 'react'
import axios from 'axios'
import NewCommentForm from './NewCommentForm';
import EditComment from './EditComment';
import styled from 'styled-components'

const EachComment = styled.div`
margin: 50px;
width: 60%;
hyphens: auto;
h2 {
    margin: 5px 0;
}
h4 {
    margin: 5px 0
}
button {
    background-color: #981717;
    border: none;
    color: white;
}
`

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
                            <EachComment key={i}>
                                {comment.editComment ? <EditComment /> :
                                    <div>
                                        <button onClick={() => { this.deleteComment(comment._id) }}>X</button>
                                        <h2>Title: {comment.title}</h2>
                                        <h4>Author: {comment.author}</h4>
                                        <p>{comment.comment}</p>
                                    </div>}
                            </EachComment>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default CommentList;