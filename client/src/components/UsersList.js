import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
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
   

`
const EachUser = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    a {
        display: flex;
        flex-direction: column;
    }
    img {
        display: flex;
        flex-direction: column;
        width: 100px;
        height: 100px;
    }   
    button {
        margin: 0 auto;
    }
`
const SignUp = styled.div`
    display: flex;
    flex-direction: column;
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
                <Content>
                <UserList>
                {this.state.users.map((user, i) => {
                    return (
                        <div key={i}>
                        <Link to={`/${user._id}/movies`}>
                        <EachUser >
                        <h1>{user.name}</h1>
                        <img src={user.image} alt=""/>
                        </EachUser>
                        </Link>
                        <button onClick={() => {this.deleteUser(user._id)}}>Remove User</button>
                        
                        </div>
                    )
                })}
                </UserList>
                <SignUp>
                    <h1>Sign Up</h1>
                    <NewUserForm newUser={this.newUser} {...this.props}/>
                </SignUp>
                </Content>
        );
    }
}

export default UsersList;