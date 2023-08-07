import React from 'react';
import './InfoButton.css'

function InfoButton({text}) {

  return (
    <>
      <div className="movie-search-explain-container">
        <span className='circle'>i</span>
        <div className="movie-search-explain">
          {text}
        </div>
      </div>
    </>
  )
}

export default InfoButton;


