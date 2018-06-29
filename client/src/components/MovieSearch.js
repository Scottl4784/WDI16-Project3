import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
    margin: 0 5% 0 0;
    display: flex;
    flex-direction: column;
    img {
        width: 100px;
        height: 150px;
    }
`
const SearchBar = styled.div`
    display: flex;
`

class MovieSearch extends Component {
    state = {
        search: [],
        searchResults: [],
        searchForMovie: false
    }

    handleChange = (event) => {
        const userInput = event.target.value
        this.setState({
            search: userInput
        })
        console.log(this.state.search)
    }
    handleSubmit = (i) => {
        const userId = this.props.match.params.userId
        axios.post(`/api/users/${userId}/movies`, this.state.searchResults[i]).then((res) => {
            this.props.newMovie(res.data.user.movies)
            console.log(res)
            this.resetState()
        })
        .then(() => {
            this.toggleSearch()
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handleSearch = () => {
        axios.get(`http://www.omdbapi.com/?t=${this.state.search}&apikey=66f47cb`)
            .then((res) => {
            const newSearchResults = [...this.state.searchResults]
            newSearchResults.push(res.data)
            this.setState({ searchResults: newSearchResults })
            console.log(res)
            })
    }
    resetState = () => {
        const resetState = {...this.state}
        resetState.search = []
        resetState.searchResults = []
        this.setState(resetState)
    }
    toggleSearch = () => {
        const searchForMovie = !this.state.searchForMovie
        this.setState({searchForMovie})
    }
    


    render() {
        return (
            <Container>
                <SearchBar>
                    <input
                        value={this.state.search}
                        placeholder="Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSearch}>Find Movie</button>
                    </SearchBar>
                    {this.state.searchResults.map((result, i) => {
                        return (
                            <div key={i}>
                                {result.Title}
                                <img src={result.Poster} alt=""/>
                                <button onClick={() => this.handleSubmit(i)}>Select</button>
                            </div>
                        )
                    })}
            </Container>
        );
    }
}

export default MovieSearch;