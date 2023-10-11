import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import './MovieCard.css';
import './../popup/PopUp.css';
import posterNotFound from './../../assets/images/404-poster-not-found.svg'
import favoritesNoFill from "../../assets/icons/favorites/heart-straight.svg";
import favoritesFill from "../../assets/icons/favorites/heart-straight-fill.svg";



import shortlistNoFill from './../../assets/icons/shortlist/bookmark-simple.svg'
import shortlistFill from './../../assets/icons/shortlist/bookmark-simple-fill.svg'

// import context
import {ShortlistContext} from '../../context/ShortlistContext';
import {FavoritesContext} from '../../context/FavoritesContext';

// TODO: import shortlist context
// TODO: import favorites context

// TODO: Add shortlist and favorites icon to MovieCard


function MovieCard({movie, setMovies}) {
  
  const {isMovieInShortlist, handleAddToShortlist, handleRemoveFromShortlist} = useContext(ShortlistContext);
  const {isMovieInFavorites, handleRemoveFromFavorites, handleAddToFavorites} = useContext(FavoritesContext);
  

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
              <p className='popup-container-text'>{movie.overview}</p>
          </div>
        </div>
      
        <p className='movie-title'>{movie.title }</p>
      </div>
      
      <div className='movie-card-bottom'>
        <p className='movie-year'>{movie.release_date.substring(0, 4)}</p>
        <p className='movie-rating'>Rating: {movie.vote_average}</p>
        <div className='icon-line'>
          {isMovieInShortlist(movie.id) ?
            <img onClick={() => handleRemoveFromShortlist(movie, setMovies)} src={shortlistFill} alt='shortlist icon fill' />
          :
            <img onClick={() => handleAddToShortlist(movie, setMovies)} src={shortlistNoFill}  alt='shortlist icon no fill' />
          }
          {isMovieInFavorites(movie.id) ?
            <img onClick={() => handleRemoveFromFavorites(movie, setMovies)} src={favoritesFill} alt='favorites icon fill'/>
                 :
            <img onClick={() => handleAddToFavorites(movie, setMovies)} src={favoritesNoFill} alt='favorites icon no fill'/>
          }
        </div>
      </div>
    </div>
  )
}

export default MovieCard;