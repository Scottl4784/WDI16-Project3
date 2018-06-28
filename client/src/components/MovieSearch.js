import React, { Component } from 'react';
import axios from 'axios'

class MovieSearch extends Component {
    state = {
        search: [],
        searchResults: []
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
    


    render() {
        return (
            <div>
                 <div>
                    <input
                        value={this.state.search}
                        placeholder="Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleSearch}>Search</button>
                </div>
                <div>
                    {this.state.searchResults.map((result, i) => {
                        return (
                            <div key={i}>
                                {result.Title}
                                <img src={result.Poster} alt=""/>
                                <button onClick={() => this.handleSubmit(i)}>Select</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default MovieSearch;