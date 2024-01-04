import React, { useEffect, useState, Suspense } from 'react';
import MovieCard from "../moviecard/MovieCard.jsx";
import './MovieSelection.css';


function MovieSelection( { loading, movies, setMovies } ) {
    
    return (
        <div
            className='movie-cards'
        >
            {movies.length > 0 ? movies.map( ( movie ) => (
                    
                    <MovieCard
                        key={movie.id}
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
        </div>
    );
}

export default MovieSelection;