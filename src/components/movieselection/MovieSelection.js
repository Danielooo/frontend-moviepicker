import React from 'react';
import MovieCard from "../moviecard/MovieCard";
import './MovieSelection.css';

function MovieSelection({loading, movies, handleAddToShortlist, isMovieInShortlist}) {

  return (
    <div>
      {/*{ loading === true && <h3>Loading...</h3>}*/}
      <div className='movie-cards'>
      { movies.length > 0 &&  movies.map((movie) => (

        <MovieCard
          movie={movie}
          handleAddToShortlist={handleAddToShortlist}
          isMovieInShortlist={isMovieInShortlist}
        />
      ))}
      </div>
    </div>
  )
}

export default MovieSelection;