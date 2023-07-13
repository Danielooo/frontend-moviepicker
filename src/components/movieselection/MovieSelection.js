import React from 'react';

function MovieSelection({ actorId, movies, addToShortList }) {
  return (
    <div className="movie-selection">
      <p>Actor ID: {actorId}</p>
      <h2>Movies:</h2>
      {movies.map(movie => (
        <div key={movie.id}>
          <button onClick={() => addToShortList(movie)} disabled={movie.isAdded}>
            +
          </button>
          <span>{movie.title}</span>
        </div>
      ))}
    </div>
  );
}

export default MovieSelection;
