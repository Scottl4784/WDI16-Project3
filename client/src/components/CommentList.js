import React, { Component } from 'react'
import axios from 'axios'
import NewCommentForm from './NewCommentForm';
import EditComment from './EditComment';
import styled from 'styled-components'

const EachComment = styled.div`
margin: 50px 0 50px 25px;
background-color: #000000bf;
padding: 25px;
width: 50%;
hyphens: auto;
color: white;  
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
    margin: 0 75px 15px 0;
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
        const clone = [...this.state.comments]
        clone[i].editComment = !clone[i].editComment
        this.setState({comments: clone})
        console.log(this.state.comments[i].editComment)
        console.log(this.state)
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
                                {comment.editComment ? <EditComment toggleEditComment={this.toggleEditComment} comment={this.state.comments[i]} /> :
                                    <div>
                                        <button onClick={() => { this.deleteComment(comment._id) }}>X</button>
                                        <button onClick={() => { this.toggleEditComment(i)}}>Edit</button>
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