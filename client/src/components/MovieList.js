import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MovieSearch from './MovieSearch';
import styled from 'styled-components'

const Container = styled.div`
display: flex;
flex-direction: row;

`
const SearchBar =  styled.div`
float: right;
display: flex;
flex-direction: column;
border-style: solid;
padding: 20px;
align-items: center;
img {
    width: 100px;
    height: 150px;
}
`
const ListOfMovies = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 75%;
    img {
        width: 175px;
        height: 250px;
    }
`
const EachMovie = styled.div`
    margin: 5%;
    display: flex;
    flex-direction: column;
    a {
        
    }
    img {
    
    }
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
                <ListOfMovies>
                    {this.state.movies.map((movie, i) => {
                        return (
                            <EachMovie key={i}>
                                <Link to={`/${this.state.user._id}/movies/${movie._id}`}>
                                <img src={movie.Poster} alt=""/>
                                {/* <h3>{movie.Title}</h3> */}
                                </Link>
                                
                                <button onClick={() => {this.deleteMovie(movie._id)}}>Remove Movie</button>
                            </EachMovie>
                        )
                    })}
                </ListOfMovies>
                <SearchBar>
                    <MovieSearch newMovie={this.newMovie} {...this.props} searchResults={this.newSearch}/>
                    </SearchBar>
            </Container>
        );
    }
}

export default MovieList;