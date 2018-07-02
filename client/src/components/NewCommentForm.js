import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
float: right;
display: flex;
flex-direction: column;
border-style: solid;
padding: 20px;
align-items: center;
height: 400px;
width: 200px;
margin: 20px;
background-color: #000000b8;
border: none;
color: white;
text-align: center;
h3 {
    margin: 0 0 15px 0;
}
input {
    text-align: center;
    width: 175px;
    height: 20px;
    margin: 5px 0;
    border: none;
}
textarea {
    margin: 25px 0 0 0;
    width: 175px;
    height: 250px;
    text-align: center;
    border: none;
}
`

class NewCommentForm extends Component {
    state = {
        title: []
    }
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
        axios.post(`/api/users/${userId}/movies/${movieId}/comments`, this.state).then((res) => {
            const singleMovie = res.data.user.movies.find((movie) => movie._id === movieId)
            this.props.newComment(singleMovie.comments)
    
        })
        .catch((err) => {
            console.log(err)
        })
    }
    resetState = () => {
        const resetState = { ...this.state }
        resetState.title = []
        resetState.author = []
        resetState.comment = []
        this.setState(resetState)
        console.log(this.state)
    }
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          this.handleSubmit()
          this.resetState()
        }
      }

    render() {
        return (
            <Container>
                <h3>New Comment</h3>
                    <input
                        value={this.state.title}
                        placeholder="Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <input
                        value={this.state.author}
                        placeholder="Author"
                        type="text"
                        name="author"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    <textarea
                        value={this.state.comment}
                        placeholder="Comment"
                        type="text"
                        name="comment"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />

            </Container>
        );
    }
}

export default NewCommentForm;