import React, { useEffect, useState } from 'react';
import MovieCard from "../moviecard/MovieCard";
import './MovieSelection.css';

function MovieSelection({loading, movies, handleAddToShortlist, isMovieInShortlist}) {
  // to avoid 'unique key neccessary' error
  const [ keyMovieSelection, setKeyMovieSelection ] = useState(0)

  function createKeyMovieSelection() {
    setKeyMovieSelection((prevKey) => prevKey + 1)
  }

  useEffect(() => {
    createKeyMovieSelection();

  }, [])

  useEffect(() => {

  }, [movies]);

  return (
        <div key={keyMovieSelection} className='movie-cards'>
        { loading === true && <h3>Loading...</h3>}
          { movies.length > 0 ?   movies.map((movie) => (

            <MovieCard
              movieKey={movie.title}
              id={movie.id}
              movie={movie}
              handleAddToShortlist={handleAddToShortlist}
              isMovieInShortlist={isMovieInShortlist}
            />
          ))
          :
            <i>- Empty -</i>
          }
        </div>
  )
}

export default MovieSelection;