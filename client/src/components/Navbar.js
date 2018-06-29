import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    height: 3rem;
    background: #6b6b6b;
    margin: 0 0 25px
`

class Navbar extends Component {
    render() {
        return (
            <Container>
                <Link to='/'>Home</Link>
            </Container>
        );
    }
}

export default Navbar;