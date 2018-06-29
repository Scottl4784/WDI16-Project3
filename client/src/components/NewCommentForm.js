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
            console.log(res.data)
            this.props.newComment(singleMovie.comments)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handleKeyPress = (event) => {
        if(event.key == 'Enter'){
          this.handleSubmit()
        }
      }

    render() {
        return (
            <Container>
                <form onKeyPress={this.handleKeyPress}>
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
                    <textarea
                        placeholder="Comment"
                        type="text"
                        name="comment"
                        onChange={this.handleChange}
                    />
                </form>
            </Container>
        );
    }
}

export default NewCommentForm;