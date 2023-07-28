import React from 'react';

function PickedMovie({ randomMovie }) {



  return (
    <>
      <div className="picked-movie">
        <h2>Picked Movie component</h2>
        {randomMovie && <p>{randomMovie.title}</p>}
      </div>
    </>
  );
}

export default PickedMovie;