import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.performSearch("avengers")
  }

  performSearch(searchTerm)
  {
    const urlstring="https://api.themoviedb.org/3/search/movie?api_key=f4e2b01a47d8c92fcebf8487252c2412&language=en-US&page=1&include_adult=false&query=" + searchTerm
    $.ajax(
      {
        url: urlstring,
        success: (searchResults) => {
          console.log("Fetch succesful")
          const results = searchResults.results
          var movieRows = []
          results.forEach((movie) => {
            movie.poster_src = "http://image.tmdb.org/t/p/w185" + movie.poster_path
            const movieRow = <MovieRow key={movie.id} movie={movie} />
            movieRows.push(movieRow)
          })
          this.setState({rows: movieRows})
        },
        error: (xhr, status, err) => { 
          console.error("Error fetch")
        }
      }
    )
  }

  searchChangeHandler(event) {
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td><img alt="App Icon" src="green_icon.svg" width="50"/></td>
              <td><h3>MoviesDB Search</h3></td>
            </tr>
          </tbody>
        </table>
        <input type="text" className="inputBox" placeholder="Enter Search Term" onChange={this.searchChangeHandler.bind(this)}/>
        {this.state.rows}
      </div>
    );
  }
}
export default App;
