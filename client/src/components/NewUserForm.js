import React, { Component } from 'react';
import axios from 'axios'

class NewUserForm extends Component {
    
    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        this.setState({
            [inputName]: userInput
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/users', this.state).then((res) => {
            console.log(res.data)
            this.props.newUser(res.data.user)
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

export default NewUserForm