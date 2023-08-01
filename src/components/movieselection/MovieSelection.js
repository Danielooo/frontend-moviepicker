import React from 'react';

function MovieSelection({loading, movies, handleAddToShortlist, isMovieInShortlist}) {

  return (
    <div>
      {/*{ loading === true && <h3>Loading...</h3>}*/}
      { movies.length > 0 &&  movies.map((movie) => (
        // component
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>Release Year: {movie.release_date}</p>
          <button
            onClick={() => handleAddToShortlist(movie)}
            disabled={isMovieInShortlist(movie.id)}
          >
            {isMovieInShortlist(movie.id) ? 'Added' : 'Add to Shortlist'}
          </button>
        </div>
      ))}
    </div>
  )
}

export default MovieSelection;