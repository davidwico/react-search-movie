import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
    return (
        <div className="card-wrapper">
            {props.movies.map((text, index) => {
              const movieTitle = text.title
              const moviePicture = 'http://image.tmdb.org/t/p/w500'+text.poster_path;
              const releaseDate = text.release_date.substring(0,4);
              const popularity = text.popularity;
              const voteCount = text.vote_count;
              const voteAverage = text.vote_average;
              const movieId = text.id;
              return (
                <div className="card-info mui-panel" key={movieId}>
                    <div className="card-info-wrapper">
                        <h2 className="card-info-header"><span className="card-bold">{movieTitle}</span></h2>
                        <p className="card-info-text">Release date: {releaseDate}</p>
                        <p className="card-info-text">Rate: {voteAverage}</p>
                        <p className="card-info-text">Votes: {voteCount}</p>
                        <p className="card-info-text">Popularity: {popularity}</p>
                        <button className="mui-btn mui-btn--small mui-btn--raised" 
                            onClick={e => props.movieDetail(index, e)}>Details
                        </button>
                    </div>
                    <img className="card-info-img" src={text.poster_path !== null ? moviePicture : ''} alt=""/>
                </div>
              )
            })}
        </div>
    )
}

export default MovieCard;