import React from 'react';

function GenreSelection({ genreId, movies, addToShortList }) {
  return (
    <div className="movie-selection">
      <p>Genre ID: {genreId}</p>
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

export default GenreSelection;

