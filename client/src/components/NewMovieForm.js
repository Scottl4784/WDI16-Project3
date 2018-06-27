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
        axios.post(`/api/users/${this.props.match.params.userId}`, this.state).then((res) => {
            console.log(res.data.movies)
            this.props.newUser(res.data.movies)
        })
    }


    render() {
        return (
            <div>
                 <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Name"
                        type="text"
                        name="name"
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