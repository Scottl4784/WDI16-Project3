import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import NewUserForm from './NewUserForm';
import styled from 'styled-components'



const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;

`
const UserList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 50px 0 0 50px
    border-radius: 20px;
`
const EachUser = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-content: center;
    margin: 10px;
    padding: 10px;
    background-color: #c3c7cc;
    border-radius: 10px;
    h1 {
        margin: 10px;
        padding: 20px 0 0 0;
    }
    a {
        display: flex;
        flex-direction: row;
    }
    img {
        display: flex;
        flex-direction: row;
        width: 60px;
        height: 60px;
        margin: 10px;
        border-radius: 50%;
    }   
    button {
        margin: 0 auto;
    }
`
const SignUp = styled.div`
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-radius: 10px;
    padding: 20px;
    height: 200px;
    background-color: #000000ad;
    color: white;
    border: none;
    input {
        height: 25px;
        border-radius: 5px;
        border-style: none;
        margin: 0 5px;
    }
`

class UsersList extends Component {
    state = {
        users: []
    }

    getUsers() {
        axios.get('/api/users').then(res => {
            this.setState({ users: res.data.users })
        })
    }

    componentDidMount() {
        this.getUsers()
    }

    newUser = (user) => {
        const newUser = [...this.state.users]
        newUser.push(user)
        this.setState({ users: newUser })
    }

    deleteUser = (userId) => {
        axios.delete(`/api/users/${userId}`).then((res) => {
            this.setState({ users: res.data.users })
        })
    }

    render() {
        return (
            <div>
                <Content>
                    <UserList>
                        {this.state.users.map((user, i) => {
                            return (
                                <EachUser key={i} >
                                    <Link to={`/${user._id}/movies`}>
                                        <img src={user.image} alt="" />
                                        <h1>{user.name}</h1>
                                    </Link>
                                    <button onClick={() => { this.deleteUser(user._id) }}>Remove User</button>
                                </EachUser>
                            )
                        })}
                    </UserList>
                    <SignUp>
                        <h1>Sign Up</h1>
                        <NewUserForm newUser={this.newUser} {...this.props} />
                    </SignUp>
                </Content>
            </div>
        );
    }
}

export default UsersList;