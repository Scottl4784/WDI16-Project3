import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios'

const EditForm = styled.div`
display: flex;
    flex-direction: column;
    border-style: solid;
    border-radius: 10px;
    padding: 20px;
    height: 200px;
    background-color: #000000ad;
    color: white;
    border: none;
    input {
        height: 25px;
        border-radius: 5px;
        border-style: none;
        margin: 0 5px;
    }
    textarea {
        resize: none;
    }
`

class EditComment extends Component {
    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        this.setState({
            [inputName]: userInput
        })
    }
    handleSubmit = () => {
        const userId = this.props.match.params.userId
        const movieId = this.props.match.params.movieId
        const commentId = this.props.commentId
        console.log(commentId)
        axios.put(`/api/users/${userId}/movies/${movieId}/comments/${commentId}`, this.state).then((res) => {
            this.props.updateComment()
        })
            .catch((err) => {
                console.log(err)
            })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSubmit()
        }
    }
    render() {
        return (
            <EditForm>
                <input
                        placeholder={this.props.comment.title}
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <input
                        placeholder={this.props.comment.author}
                        type="text"
                        name="author"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <textarea
                        placeholder={this.props.comment.comment}
                        type="text"
                        name="comment"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                <button onClick={() => {this.handleSubmit()}}>Submit</button>
            </EditForm>
        );
    }
}

export default EditComment;