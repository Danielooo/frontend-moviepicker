import React, {useState, useEffect} from 'react';
import axios from "axios";
import './MovieCard.css';
import './../popup/PopUp.css';
import posterNotFound from './../../assets/images/404-poster-not-found.svg'
// import textEllipsis from "../../helpers/TextEllipsis";


function MovieCard({movie, handleAddToShortlist, isMovieInShortlist}) {

  const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const [posterImage, setPosterImage] = useState(null);


  useEffect(() => {
    async function checkPosterUrl() {
      try {
        const response = await axios.get(posterUrl)

        if (response.status === 200) {
          setPosterImage(<img className='movie-poster' src={posterUrl} alt='poster not found'/>)
        } else {
          setPosterImage(<img className='movie-poster' src={posterNotFound} alt='poster not found'/>)
        }
      } catch (e) {
        setPosterImage(<img className='movie-poster' src={posterNotFound} alt='poster not found'/>)
        
      }
    }

    void checkPosterUrl()

  }, [posterUrl, posterNotFound]);
  

  return (
    <div className='movie-card'>
      <div className='movie-card-top'>
      
        <div className='movie-poster-container'>
          {posterImage}
          <div className='popup-container'>
            <div className='popup-text'>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      
        <p className='movie-title'>{movie.title }</p>
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