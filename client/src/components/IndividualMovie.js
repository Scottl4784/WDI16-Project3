import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
`
const Poster = styled.div`
    margin: 25px;

`
const MovieInfo = styled.div`
    background-color: #000000bf;
    margin: 50px;
    padding: 25px;
    color: white;
`

class IndividualMovie extends Component {
    state = {
        user: {},
        movie: [],
        comments: []
    }

    getMovie() {
        const userId = this.props.match.params.userId
        const movieId = this.props.match.params.movieId
        axios.get(`/api/users/${userId}/movies/${movieId}`)
            .then((res) => {
                console.log(res.data)
                this.setState({
                    user: res.data,
                    movie: res.data.movie,
                    comments: res.data.movie.comments,
                })
            })
    }

    componentDidMount() {
        this.getMovie()
    }

    render() {
        const userId = this.props.match.params.userId
        const movieId = this.state.movie._id
        return (
            <Container>
                <MovieInfo>
                <h2>{this.state.movie.Title}</h2>
                <p>Summary: {this.state.movie.Plot}</p>
                <p>Director: {this.state.movie.Director}</p>
                <p>Rating: {this.state.movie.Rated}</p>
                <p>Release Date: {this.state.movie.Year}</p>
                <button><Link to={`/${userId}/movies/${movieId}/comments`} comments={this.state.comments}>Comments</Link></button>
                </MovieInfo>
                <Poster>
                <img src={this.state.movie.Poster} alt="" />
                </Poster>
            </Container>
        );
    }
}

export default IndividualMovie;