import React from 'react';

function Shortlist({ shortList, handleDeleteMovie }) {
  return (
    <div className="shortlist">
      <h2>Shortlist</h2>
      {shortList.length > 0 ? (
        <ul>
          {shortList.map(movie => (
            <li key={movie.id}>
              <button onClick={() => handleDeleteMovie(movie)}>-</button>
              <span>{movie.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <i>No movies selected</i>
      )}
    </div>
  );
}

export default Shortlist;
