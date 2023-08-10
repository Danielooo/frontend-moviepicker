import React from 'react';
import './InfoButton.css'

function InfoButton({text}) {

  const sentences = text.split('\n').map((sentence, index) => (
    <p key={index}>{sentence}</p>
  ))

  console.log('sentences: ', sentences)

  return (
    <>
      <div className="movie-search-explain-container">
        <span className='circle'>i</span>
        <p className="movie-search-explain">
          {sentences}
        </p>
      </div>
    </>
  )
}

export default InfoButton;


