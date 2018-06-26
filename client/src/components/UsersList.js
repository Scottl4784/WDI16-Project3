import React, { Component } from 'react';
import axios from 'axios'


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
                User List Component
            </div>
        );
    }
}

export default UsersList;