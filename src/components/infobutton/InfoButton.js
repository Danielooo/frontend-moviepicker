import React from 'react';
import './InfoButton.css'

function InfoButton({text}) {

  const sentences = text.split('\n').map((sentence, index) => (
    <p key={index}>{sentence}</p>
  ))


  return (
    <>
      <div className="movie-search-explain-container">
        <span className='circle'>i</span>
        <div className="movie-search-explain">
          {sentences}
        </div>
      </div>
    </>
  )
}

export default InfoButton;


