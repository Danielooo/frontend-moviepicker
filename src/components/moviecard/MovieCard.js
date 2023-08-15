import React from 'react';
import axios from "axios";
import './MovieCard.css';
import './../popup/PopUp.css';
import './../infobutton/InfoButton.css';

function MovieCard({movieKey, movie, handleAddToShortlist, isMovieInShortlist}) {

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div key={movieKey} className='movie-card'>
      <div className='movie-card-top'>

        <div className='movie-poster-container'>
          <img className='movie-poster' src={posterUrl} alt='poster not found'/>
          <div className='popup-container'>
            <div className='popup-text'>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>

        <p className='movie-title'>{movie.title}</p>
      </div>

      <div className='movie-card-bottom'>
        <p className='movie-year'>{movie.release_date.substring(0, 4)}</p>
        <p className='movie-rating'>Rating: {movie.vote_average}</p>
        <button className='regular-button'
          onClick={() => handleAddToShortlist(movie)}
          disabled={isMovieInShortlist(movie.id)}
        >
          {isMovieInShortlist(movie.id) ? 'Added' : 'Add to Shortlist'}
        </button>
      </div>
    </div>
  )
}

export default MovieCard;