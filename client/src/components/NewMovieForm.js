import React, { Component } from 'react';
import axios from 'axios'

class NewMovieForm extends Component {

    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        this.setState({
            [inputName]: userInput
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`/api/users/${this.props.match.params.userId}/movies`, this.state).then((res) => {
            console.log(this.state)
            this.props.newMovie(this.state)
        })
        .catch((err) => {
            console.log(err)
        })
    }


    render() {
        return (
            <div>
                 <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="Summary"
                        type="text"
                        name="summary"
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="Image"
                        type="text"
                        name="image"
                        onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
                </div>
            </div>
        );
    }
}

export default NewMovieForm;