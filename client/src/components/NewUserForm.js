import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
`

class NewUserForm extends Component {
    state = {
        name: [],
    }

    
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
            this.props.newUser(res.data.user)
            this.resetState()
            console.log(this.state)
        })
    }
    resetState = () => {
        const resetState = {...this.state}
        resetState.name = []
        resetState.image = []
        this.setState(resetState)
    }


    render() {
        return (
            <Container>
                
                    <input
                        placeholder="Name"
                        value={this.state.name}
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="Image"
                        value={this.state.image}
                        type="text"
                        name="image"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSubmit}>Create</button>
             
            </Container>
        );
    }
}

export default NewUserForm