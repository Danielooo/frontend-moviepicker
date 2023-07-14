import React from 'react';

function PickedMovie({ movies }) {

  function pickRandomMovie() {
    let randomMovie = movies[Math.floor(Math.random() * movies.length)];
    console.log(randomMovie);
    return (
      <p>{randomMovie.title}</p>
    )
  }

  return (
    <>
      <div className="picked-movie">
        <h2>Picked Movie component</h2>
        {pickRandomMovie()}
      </div>
    </>
  )
}

export default PickedMovie;