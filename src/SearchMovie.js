import React, { Component } from 'react';
import './SearchMovie.css';
import MovieCard from './MovieCard';
import Modal from './Modal';

class SearchMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: undefined,
      requestLink: undefined,
      movies: [],
      moviesId: [],
      movieDetail: undefined,
      modal: 'hidden',
      sort: false
    }
    this.getRequest = this.getRequest.bind(this);
    this.movieDetail = this.movieDetail.bind(this);
    this.sort = this.sort.bind(this);
  }

  textChangeHandler(e) {
    this.setState({
      searchTitle: e.target.value
    })
  }

  sort() {
    this.setState({
      sort: true
    }, () => this.getRequest())
  }

  requestOnEnter(e) {
    if(e.key === 'Enter') {
      this.getRequest()
    }
  }

  getRequest() {
    const title = this.state.searchTitle;
    if (title === undefined || title === '') {
      return
    }
    const replace = title.split(' ').join('%20');
    const reqLink = 'https://api.themoviedb.org/3/search/movie?api_key=ff38a1d81aa1ac764ffd7014470cae8d&language=en-US&query='+replace+'&page=1&include_adult=false';
    this.setState({
      requestLink: reqLink
    }, () => {
      fetch(this.state.requestLink)
      .then(data => data.json())
      .then((temp) => this.setState({
          movies: temp.results,
          sort: false
      }))
      .then( 
        this.state.sort !== true ? undefined : 
          () => {
            const moviesArray = [...this.state.movies];
            moviesArray.sort((a, b) => a.title.localeCompare(b.title));
            this.setState({
              movies: moviesArray
            })
          }
      )
      .then(() => {
        const array = [];
        const moviesArray = this.state.movies;
        moviesArray.map((i, x) => {
          return array.push(i.id)
        });
        this.setState({
          moviesId: array
        });
      });
    });
  }

  closeModal() {
    this.setState({
      modal: 'hidden'
    })
  }

  movieDetail(index, e) {
    const movieId = this.state.moviesId[index];
    const detailUrl = 'https://api.themoviedb.org/3/movie/'+movieId+'?api_key=ff38a1d81aa1ac764ffd7014470cae8d&language=en-US';
    fetch(detailUrl)
    .then(data => data.json())
    .then(details => {
        this.setState({
          movieDetail: details
        }, ()=>{
          this.setState({
            modal: 'visible'
          })})
        })
  }


  render() {
    return (
      <div className="mui-textfield">
        <input className="movie-input" type="text" onChange={e => this.textChangeHandler(e)} 
          onKeyPress={e => this.requestOnEnter(e)} value={this.state.searchTitle} spellCheck="false" placeholder="Search movie" />
        <div className="movie-content">
          <button className="movie-search-btn mui-btn mui-btn--flat" onClick={this.getRequest}>Find</button>
          <button className="movie-search-btn mui-btn mui-btn--flat" onClick={this.sort}>Sort by title</button>
          <div className="movies-list">
            <MovieCard movies={this.state.movies} movieDetail={this.movieDetail}/>
          </div>
        </div>
        <Modal modal={this.state.modal} movieDetail={this.state.movieDetail} closeModal={this.closeModal.bind(this)}/>
      </div>
    );
  }
}

export default SearchMovie;
