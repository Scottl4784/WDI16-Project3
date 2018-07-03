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
`

class EditComment extends Component {
    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        console.log(this.state)
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
            this.resetState()
        }
    }
    render() {
        return (
            <EditForm>
                <input
                        value={this.props.title}
                        placeholder="Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <input
                        value={this.props.author}
                        placeholder={this.props.author}
                        type="text"
                        name="author"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <textarea
                        placeholder="Comment"
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