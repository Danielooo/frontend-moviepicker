import React from 'react';
import axios from "axios";
import './MovieCard.css';

function MovieCard({movie, handleAddToShortlist, isMovieInShortlist}) {


  console.log('movie', movie)

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div key={movie.id} className='movie-card'>
      <div className='movie-card-top'>
        <img className='movie-poster' src={posterUrl} alt='poster not found'/>
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