import React, { useEffect, useState } from 'react';
import MovieCard from "../moviecard/MovieCard.jsx";
import './MovieSelection.css';


function MovieSelection( { loading, movies, setMovies } ) {
    
    return (
      <div className='movie-cards'>
          {loading === true && <h3>Loading...</h3>}
          {movies.length > 0 ? movies.map( ( movie ) => (
              
              <MovieCard key={movie.id} withIcons={true} movie={movie} setMovies={setMovies}
              
              />
            ) )
            :
            <>
                <i>- Empty -</i>
            </>
          }
      </div>
    );
}

export default MovieSelection;