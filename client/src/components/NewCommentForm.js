import React, { Component } from 'react'
import axios from 'axios'

class NewCommentForm extends Component {
    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        this.setState({
            [inputName]: userInput
        })
    }
    handleSubmit = (event) => {
        const userId = this.props.match.params.userId
        const movieId = this.props.match.params.movieId
        event.preventDefault()
        axios.post(`/api/users/${userId}/movies/${movieId}/comments`, this.state).then((res) => {
            const singleMovie = res.data.user.movies.find((movie) => movie._id === movieId)
            console.log(res.data)
            this.props.newComment(singleMovie.comments)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="Author"
                        type="text"
                        name="author"
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="Comment"
                        type="text"
                        name="comment"
                        onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default NewCommentForm;