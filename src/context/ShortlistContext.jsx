import React, { createContext, useEffect, useState } from 'react';


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
        localStorage.setItem( 'localStorageShortlist', updatedShortlist );
    }
    
    function localStorageShortlistToEmptyArray() {
        localStorage.setItem( 'localStorageShortlist', JSON.stringify( [] ) );
    }
    
    function clearShortlistAndLocalStorageShortlist() {
        setShortlist( [] );
        localStorageShortlistToEmptyArray();
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
    
    // setMovies een standaardwaarde meegegeven als bugfix bij removing van shortlist
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
