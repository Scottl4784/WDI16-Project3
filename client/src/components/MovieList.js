import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MovieSearch from './MovieSearch';
import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction: row-reverse;
justify-content: space-evenly;
`
const ListOfMovies = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`
const EachMovie = styled.div`
img {
    width: 100px;
}
`
const SearchBar = styled.div`

`

class MovieList extends Component {
    state = {
        user: [],
        movies: [],
        searchResults: []
    }

    getMovies() {
        const userId = this.props.match.params.userId
        axios.get(`/api/users/${userId}`)
            .then((res) => {
                console.log()
                this.setState({
                    user: res.data,
                    movies: res.data.movies,
                })
            })
    }

    componentDidMount() {
        this.getMovies()
    }

    
    newSearch = (results) => {
        this.setState({searchResults: results})
    }

    newMovie = (movies) => {
        this.setState({ movies: movies })
        this.props.history.push()
        console.log(movies)
    }
    deleteMovie = (movieId) => {
        const userId = this.props.match.params.userId
        axios.delete(`/api/users/${userId}/movies/${movieId}`).then((res) => {
            console.log(res.data.user.movies)
            this.setState({movies: res.data.user.movies})
        })
    }
    


    render() {
        return (
            <Container>
                    <MovieSearch newMovie={this.newMovie} {...this.props} searchResults={this.newSearch}/>
                <ListOfMovies>
                    {this.state.movies.map((movie, i) => {
                        return (
                            <EachMovie key={i}>
                                <img src={movie.Poster} alt=""/>
                                <img src={movie.image} alt="" />
                                <Link to={`/${this.state.user._id}/movies/${movie._id}`}><h3>{movie.Title}</h3></Link>
                                <button onClick={() => {this.deleteMovie(movie._id)}}>Remove Movie</button>
                            </EachMovie>
                        )
                    })}
                </ListOfMovies>
            </Container>
        );
    }
}

export default MovieList;