import React, { Component } from 'react';
import axios from 'axios'

class MovieSearch extends Component {
    state = {
        search: 'Havoc',
        searchResults: []
    }

    handleChange = (event) => {
        const inputName = event.target.name
        const userInput = event.target.value
        this.setState({
            search: userInput
        })
    }
    handleSubmit = (event) => {
        const userId = this.props.match.params.userId
        event.preventDefault()
        axios.post(`/api/users/${userId}/movies`, this.state).then((res) => {
            this.props.newMovie(res.data.user.movies)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handleSearch = (event) => {
        event.preventDefault()
        axios.get(`http://www.omdbapi.com/?t=${this.state.search}&apikey=66f47cb`)
            .then((res) => {
            const newSearchResults = [...this.state.searchResults]
            newSearchResults.push(res.data)
            this.setState({ searchResults: newSearchResults })
            console.log(newSearchResults)
        })
    }
    // componentDidMount() {
    //     this.handleSearch()
    // }
    


    render() {
        return (
            <div>
                 <div>
                <form onSubmit={() => this.handleSearch()}>
                    <input
                        placeholder="Title"
                        type="text"
                        name="title"
                        onChange={this.handleChange}
                    />
                    <button>Submit</button>
                </form>
                </div>
                <div>
                    {this.state.searchResults.map((result, i) => {
                        return (
                            <div key={i}>
                                {result.Title}
                                <img src={result.Poster} alt=""/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default MovieSearch;