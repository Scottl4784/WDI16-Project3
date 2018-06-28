import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import NewUserForm from './NewUserForm';
import styled from 'styled-components'

const UserList = styled.div`
    img {
        width: 50px;
    }
`

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
    
    newUser = (user) => {
        const newUser = [...this.state.users]
        newUser.push(user)
        this.setState({users: newUser})
    }

    deleteUser = (userId) => {
        axios.delete(`/api/users/${userId}`).then((res) => {
            console.log(res.data)
            this.setState({users: res.data.users})
        })
    }

    render() {
        return (
            <div>
                <div>
                    <NewUserForm newUser={this.newUser} {...this.props}/>
                </div>
                <UserList>
                {this.state.users.map((user, i) => {
                    return (
                        <div key={i}>
                        <Link to={`/${user._id}/movies`}>
                        <h3>{user.name}</h3>
                        <img src={user.image} alt=""/>
                        </Link>
                        <button onClick={() => {this.deleteUser(user._id)}}>Remove User</button>
                        </div>
                    )
                })}
                </UserList>
            </div>
        );
    }
}

export default UsersList;