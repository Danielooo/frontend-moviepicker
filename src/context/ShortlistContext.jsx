import React, { createContext, useEffect, useState } from 'react';

import ShortlistIconNoFill from './../assets/icons/shortlist/bookmark-simple.svg';
import ShortlistIconFill from './../assets/icons/shortlist/bookmark-simple-fill.svg';


export const ShortlistContext = createContext( [] );

function ShortlistContextProvider( { children } ) {
    const [ shortlist, setShortlist ] = useState( [] );
    const [ afterMount, setAfterMount ] = useState( false );
    
    
    useEffect( () => {
        // checks if shortlist exists. If not, declares shortlist in localStorage and sets shortlist to empty array
        try {
            if ( localStorage.getItem( 'localStorageShortlist' ) ) {
                const arrayAsString = localStorage.getItem( 'localStorageShortlist' );
                const parsedShortlist = JSON.parse( arrayAsString );
                
                setShortlist( parsedShortlist );
                setAfterMount( true );
                
            } else {
                const emptyArray = [];
                localStorage.setItem( 'localStorageShortlist', JSON.stringify( emptyArray ) );
                setShortlist( emptyArray );
            }
        } catch ( e ) {
            console.error( 'error retrieving shortlist from localStorage: ', e );
        }
        
    }, [] );
    
    // Every time shortlist state is updated >> localStorageShortlist is updated as well
    // if (afterMount) prevents infinite loop on shortlist on mount
    useEffect( () => {
        if ( afterMount ) {
            shortlistToLocalStorageShortlist();
        }
    }, [ shortlist ] );
    
    
    function getLocalStorageShortlist() {
        return localStorage.getItem( 'localStorageShortlist' );
    }
    
    function shortlistToLocalStorageShortlist() {
        const updatedShortlist = JSON.stringify( shortlist );
        console.log( 'shortlist stringified type and value: ', typeof shortlist, shortlist );
        localStorage.setItem( 'localStorageShortlist', updatedShortlist );
    }
    
    function localStorageShortlistToEmptyArray() {
        localStorage.setItem( 'localStorageShortlist', JSON.stringify( [] ) );
    }
    
    function clearShortlistAndLocalStorageShortlist() {
        setShortlist( [] );
        localStorageShortlistToEmptyArray();
        console.log( 'clear shortlist invoked' );
    }
    
    
    function handleAddToShortlist( movie, setMovies ) {
        
        
        if ( shortlist.length < 10 ) {
            setShortlist( ( prevShortlist ) => [ ...prevShortlist, movie ] );
            setMovies( ( prevMovies ) =>
                prevMovies.map( ( prevMovie ) =>
                    prevMovie.id === movie.id ? { ...prevMovie, isAdded: true } : prevMovie
                )
            );
        } else {
            alert( 'you can only have 10 movies in your Shortlist' );
        }
        
    }
    
    function handleRemoveFromShortlist( movie, setMovies = () => {
    } ) {
        setShortlist( ( prevShortlist ) =>
            prevShortlist.filter( ( prevMovie ) => prevMovie.id !== movie.id )
        );
        
        setMovies( ( prevMovies ) =>
            prevMovies.map( ( prevMovie ) => {
                return prevMovie.id === movie.id ? { ...prevMovie, isAdded: false } : prevMovie;
            } )
        );
    }
    
    function isMovieInShortlist( movieId ) {
        return shortlist.some( ( item ) => item.id === movieId );
    }
    
    const shortlistActions = {
        shortlist,
        setShortlist,
        isMovieInShortlist,
        handleAddToShortlist,
        handleRemoveFromShortlist,
        clearShortlistAndLocalStorageShortlist,
    };
    
    return (
        <ShortlistContext.Provider value={shortlistActions}>
            {children}
        </ShortlistContext.Provider>
    );
}

export default ShortlistContextProvider;
