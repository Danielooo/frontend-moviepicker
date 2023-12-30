import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import './MovieCard.css';
import './../popup/PopUp.css';
import posterNotFound from './../../assets/images/404-poster-not-found.svg';
import favoritesNoFill from "../../assets/icons/favorites/heart-straight.svg";
import favoritesFill from "../../assets/icons/favorites/heart-straight-fill.svg";


import shortlistNoFill from './../../assets/icons/shortlist/bookmark-simple.svg';
import shortlistFill from './../../assets/icons/shortlist/bookmark-simple-fill.svg';

// import context
import { ShortlistContext } from '../../context/ShortlistContext.jsx';
import { FavoritesContext } from '../../context/FavoritesContext.jsx';
import { MoviesContext } from '../../context/MoviesContext.jsx';


function MovieCard( { movie, withIcons } ) {
    
    const { isMovieInShortlist, handleAddToShortlist, handleRemoveFromShortlist } = useContext( ShortlistContext );
    const { isMovieInFavorites, handleRemoveFromFavorites, handleAddToFavorites } = useContext( FavoritesContext );
    const { setMovies } = useContext( MoviesContext );
    
    const [ posterImage, setPosterImage ] = useState( null );
    
    if ( movie ) {
        useEffect( () => {
            async function checkPosterUrl() {
                try {
                    const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    // console.log( 'posterUrl: ', posterUrl );
                    const response = await axios.get( posterUrl );
                    // console.log( 'response: ', response.data );
                    // console.log( 'response.status: ', response.status );
                    
                    setPosterImage( posterUrl );
                    
                } catch ( e ) {
                    setPosterImage( posterNotFound );
                }
            }
            
            void checkPosterUrl();
            
        }, [ movie.poster_path ] );
        
        
        return (
            <>
                
                <div className='movie-card'>
                    
                    <div className='movie-poster-container'>
                        <img
                            className='movie-poster'
                            src={posterImage}
                            alt='poster not found'
                        />
                        <div className='popup-container'>
                            <p className='popup-container-text'>{movie.overview ? movie.overview :
                                '- Overview not found,' +
                                ' please try again - '}</p>
                        </div>
                    </div>
                    
                    <p className='movie-title'>{movie.title}</p>
                    
                    <div className='movie-card-bottom'>
                        <p className='movie-year'>{movie.release_date.substring( 0, 4 )}</p>
                        <p className='movie-rating'>Rating: {movie.vote_average}</p>
                        
                        {withIcons &&
                            <div className='icon-line'>
                                {isMovieInShortlist( movie.id ) ?
                                    <img
                                        onClick={() => handleRemoveFromShortlist( movie, setMovies )}
                                        src={shortlistFill}
                                        alt='shortlist icon fill'
                                    />
                                    :
                                    <img
                                        onClick={() => handleAddToShortlist( movie, setMovies )}
                                        src={shortlistNoFill}
                                        alt='shortlist icon no fill'
                                    />
                                }
                                {isMovieInFavorites( movie.id ) ?
                                    <img
                                        onClick={() => handleRemoveFromFavorites( movie, setMovies )}
                                        src={favoritesFill}
                                        alt='favorites icon fill'
                                    />
                                    :
                                    <img
                                        onClick={() => handleAddToFavorites( movie, setMovies )}
                                        src={favoritesNoFill}
                                        alt='favorites icon no fill'
                                    />
                                }
                            </div>
                        }
                    </div>
                </div>
            
            </>
        );
    }
}

export default MovieCard;