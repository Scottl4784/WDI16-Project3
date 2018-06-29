import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    height: 5rem;
    background: #6b6b6b;
    margin: 25px;
    display: flex;
    justify-content: space-between;
`
const Logo = styled.div`
    border-right-style: solid;
    padding: 2rem 1rem;
`
const HomeButton = styled.div`
    padding: 1rem 1rem 0 0;
`

class Navbar extends Component {
    render() {
        return (
            <Container>
                <Logo>
                    Movie Message Board
                </Logo>
                <HomeButton>
                <Link to='/'>Home</Link>
                </HomeButton>
            </Container>
        );
    }
}

export default Navbar;