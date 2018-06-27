import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class UsersList extends Component {
    state = {
        users: []
    }

    getUsers() {
        axios.get('/api/users').then(res => {
            console.log(res.data.users)
            this.setState({users: res.data.users})
        })
    }

    componentDidMount() {
        this.getUsers()
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/users', this.state).then((res) => {
            console.log(res.data)
            this.newUser(res.data)
        })
    }
    newUser = (user) => {
        const newUser = [...this.state.users]
        newUser.push(user)
        this.setState({users: newUser})
    }

    render() {
        return (
            <div>
                {this.state.users.map((user, i) => {
                    return (
                        <div key={i}>
                        <Link to={`/${user._id}/movies`}>
                        <h3>{user.name}</h3>
                        </Link>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default UsersList;