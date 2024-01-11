import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import styles from './MovieCard.module.css';
import posterNotFound from './../../assets/images/404-poster-not-found.svg';
import favoritesNoFill from "../../assets/icons/favorites/heart-straight.svg";
import favoritesFill from "../../assets/icons/favorites/heart-straight-fill.svg";


import shortlistNoFill from './../../assets/icons/shortlist/bookmark-simple.svg';
import shortlistFill from './../../assets/icons/shortlist/bookmark-simple-fill.svg';

// import context
import { ShortlistContext } from '../../context/ShortlistContext.jsx';
import { FavoritesContext } from '../../context/FavoritesContext.jsx';
import { MoviesContext } from '../../context/MoviesContext.jsx';
import textShortener from '../../helpers/textShortener.js';
import PopUp from '../popup/PopUp.jsx';


function MovieCard( { movie, withIcons } ) {
    
    const { isMovieInShortlist, handleAddToShortlist, handleRemoveFromShortlist } = useContext( ShortlistContext );
    const { isMovieInFavorites, handleRemoveFromFavorites, handleAddToFavorites } = useContext( FavoritesContext );
    const { setMovies } = useContext( MoviesContext );
    
    const [ posterImage, setPosterImage ] = useState( null );
    
    const maxCharsMovieTitle = 30;
    
    if ( movie ) {
        useEffect( () => {
            async function checkPosterUrl() {
                try {
                    const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    const response = await axios.get( posterUrl );
                    
                    setPosterImage( posterUrl );
                    
                } catch ( e ) {
                    setPosterImage( posterNotFound );
                }
            }
            
            void checkPosterUrl();
            
        }, [ movie.poster_path ] );
        
        
        return (
            <>
                
                <div className={styles[ 'movie-card' ]}>
                    
                    <div className={styles[ 'movie-poster-container' ]}>
                        <img
                            className={styles[ 'movie-poster' ]}
                            src={posterImage}
                            alt='poster not found'
                        />
                        <PopUp
                            text={movie.overview}
                        />
                    </div>
                    
                    <p className={styles[ 'movie-title' ]}>{movie.title.length <= maxCharsMovieTitle ? movie.title :
                        textShortener( movie.title, maxCharsMovieTitle )}</p>
                    
                    <div className={styles[ 'movie-card-bottom' ]}>
                        <p className={styles[ 'movie-year' ]}>{movie.release_date.substring( 0, 4 )}</p>
                        <p className={styles[ 'movie-rating' ]}>Rating: {movie.vote_average}</p>
                        
                        {withIcons &&
                            <div className={styles[ 'icon-line' ]}>
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