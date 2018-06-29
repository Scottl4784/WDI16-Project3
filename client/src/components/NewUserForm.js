import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
`

class NewUserForm extends Component {

    
    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        this.setState({
            [inputName]: userInput
        })
        console.log(this.state)
    }
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/users', this.state).then((res) => {
            this.props.newUser(res.data.user)
        })
    }
    resetState = () => {
        let resetState = {...this.state}
        resetState = []
        this.setState(resetState)
    }


    render() {
        return (
            <Container>
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
                    <button>Create</button>
                </form>
            </Container>
        );
    }
}

export default NewUserForm