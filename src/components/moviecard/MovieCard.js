import React, { useState, useEffect } from 'react';
import axios from "axios";
import './MovieCard.css';
import './../popup/PopUp.css';
import './../infobutton/InfoButton.css';
import posterNotFound from './../../assets/images/404-poster-not-found.svg'

function MovieCard({movieKey, movie, handleAddToShortlist, isMovieInShortlist}) {

  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const [ posterImage, setPosterImage ] = useState(null);



  useEffect(() => {
    async function checkPosterUrl() {
      try {
        const response = await axios.get(posterUrl)


        if (response.status === 200) {
          setPosterImage(<img className='movie-poster' src={posterUrl} alt='poster not found'/>)
          console.log('response data when 200: ', response)
        } else {
          setPosterImage(<img className='movie-poster' src={posterNotFound}  alt='poster not found'/>)
          console.log('response data when else: ', response)

        }
      } catch (e) {
        setPosterImage(<img className='movie-poster' src={posterNotFound}  alt='poster not found'/>)
        console.log('error when catch: ')
        console.error(e)
      }
    }

    void checkPosterUrl()

  }, [posterUrl, posterNotFound]);



  return (
    <div key={movieKey} className='movie-card'>
      <div className='movie-card-top'>

        <div className='movie-poster-container'>
          {posterImage}
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