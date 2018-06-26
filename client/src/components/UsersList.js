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