import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import './MovieCard.css';
import './../popup/PopUp.css';
import posterNotFound from './../../assets/images/404-poster-not-found.svg'
import heartStraight from "../../assets/icons/favorites/heart-straight.svg";
import heartStraightFilled from "../../assets/icons/favorites/heart-straight-fill.svg";
// import textEllipsis from "../../helpers/TextEllipsis";

// import context
import {ShortlistContext} from '../../context/ShortlistContext';
import {FavoritesContext} from '../../context/FavoritesContext';

// TODO: import shortlist context
// TODO: import favorites context

// TODO: Add shortlist and favorites icon to MovieCard


function MovieCard({movie, handleAddToShortlist, isMovieInShortlist}) {
  
  const {shortlist, setShortlist} = useContext(ShortlistContext);
  const {favorites, setFavorites} = useContext(FavoritesContext);
  

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
        <img src={heartStraight} alt='heart straight icon' />
        <img src={heartStraightFilled} alt='heart straight filled icon' />
        
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