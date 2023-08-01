import React from 'react';

function Shortlist({ shortlist, handleRemoveFromShortlist }) {
  return (
    <>
      <h2>Shortlist</h2>

      { shortlist.length > 0 ? (
        shortlist.map((movie) => (
          <div key={movie.id} style={{ display: 'flex', alignItems: 'center' }} >
            <button onClick={() => handleRemoveFromShortlist(movie)}>
              -
            </button>
            <p>
              {movie.title}
            </p>
          </div>
        )))
      :
        <i> - empty - </i>
      }
    </>
  );
}

export default Shortlist;
