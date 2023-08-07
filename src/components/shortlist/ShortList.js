import React from 'react';
import './ShortList.css'

function Shortlist({ shortlist, handleRemoveFromShortlist }) {
  return (
    <>
      <div className='shortlist-movies'>
        { shortlist.length > 0 ? (
          shortlist.map((movie) => (
            <div key={movie.id} className='shortlist-movie' >
              <button onClick={() => handleRemoveFromShortlist(movie)}>
                -
              </button>
              <p>
                {movie.title}
              </p>
            </div>
          )))
        :
          <i className='shortlist-empty-text'> - Empty - </i>
        }
      </div>
    </>
  );
}

export default Shortlist;
