import React, { useEffect, useState, useId, Suspense } from 'react';
import MovieCard from "../moviecard/MovieCard.jsx";
import './MovieSelection.css';

// TODO: vragen of Suspense hier correct is gebruikt
// TODO: foutmelding Warning: Each child in a list should have a unique "key" prop. bij regel 11 na refresh in Favorites

function MovieSelection( { loading, movies, setMovies } ) {
    const idPrefix = useId();
    
    return (
        <div
            key={idPrefix}
            className='movie-cards'
        >
            {/*{loading === true && <h3>Loading...</h3>}*/}
            <Suspense fallback={<div>Searching database...</div>}>
                {movies.length > 0 ? movies.map( ( movie ) => (
                        
                        
                        <MovieCard
                            key={`${idPrefix}-${movie.id}`}
                            withIcons={true}
                            movie={movie}
                            setMovies={setMovies}
                        
                        />
                    
                    ) )
                    :
                    <>
                        <i>- So empty! Find a selection of movies through Movie Search -</i>
                    </>
                }
            </Suspense>
        </div>
    );
}

export default MovieSelection;