import React from 'react';
import './ShortList.css'
import Button from './../button/Button';
import { useNavigate } from 'react-router-dom';

function Shortlist({ shortlist, handleRemoveFromShortlist }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/wheel');
    console.log('navigate to wheel invoked')
  }

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
