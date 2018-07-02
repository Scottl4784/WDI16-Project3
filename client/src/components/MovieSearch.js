import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
float: right;
display: flex;
flex-direction: column;
border-style: solid;
padding: 20px;
align-items: center;
height: 400px;
width: 200px;
margin: 20px;
background-color: #000000b8;
border: none;
color: white;
img {
    width: 100px;
    height: 150px;
}
`
const SearchBar = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 25px 0
    button {
        margin: 5px;
        height: 30px;
        width: 60px;
        border-radius: 5px;
        background: #eceae4;
    }
    input {
        margin: 5px;
        border-radius: 5px;
        border: none;
        height: 25px;
        width: 150px;
        text-align: center;
    }
`
const SearchResults = styled.div`
    display: flex;
    flex-direction: column;
    button {
        background: #333f4b;
        border-style: none;
    }
    
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
        .catch((err) => {
            console.log(err)
        })
    }
    handleSearch = () => {
        axios.get(`https://www.omdbapi.com/?t=${this.state.search}&apikey=66f47cb`)
            .then((res) => {
            const newSearchResults = [...this.state.searchResults]
            newSearchResults.push(res.data)
            this.setState({ searchResults: newSearchResults })
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
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          this.handleSearch()
        }
      }
    


    render() {
        return (
            <Container>
                <h3>Find a movie</h3>
                <SearchBar>
                    <input
                        value={this.state.search}
                        placeholder="Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    </SearchBar>
                    {this.state.searchResults.map((result, i) => {
                        return (
                            <SearchResults key={i}>                                
                                <button onClick={() => this.handleSubmit(i)}><img src={result.Poster} alt=""/></button>
                            </SearchResults>
                        )
                    })}

            </Container>
        );
    }
}

export default MovieSearch;