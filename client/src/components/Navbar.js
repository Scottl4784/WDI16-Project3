import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    height: 5rem;
    background: #6b6b6b;
    margin: 25px;
`

class Navbar extends Component {
    render() {
        return (
            <Container>
                <Link to='/'>Home</Link>
                {/* <Link to='../'>Back</Link> */}
            </Container>
        );
    }
}

export default Navbar;