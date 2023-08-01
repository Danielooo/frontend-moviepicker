import React, {useState, useContext, useEffect} from 'react';
import { Link } from "react-router-dom";

import { ShortlistContext } from "../../context/ShortlistContext";
import ShortList from "../../components/shortlist/ShortList";

function Randomizer() {
  const [ randomMovie, setRandomMovie ] = useState(null);
  const { shortlist } = useContext(ShortlistContext);

  const getRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * shortlist.length);
    setRandomMovie(shortlist[randomIndex]);
    console.log('RandomMovie() invoked')
  };

  return (
    <>
      <div>
        <ShortList shortlist={shortlist} />

        <button
          type='button'
          onClick={getRandomMovie}
        >
          Randomize
        </button>
        {randomMovie && <p>{randomMovie.title}</p>}
      </div>

      <Link to="/">Back to adding movies</Link>
    </>
  );
}

export default Randomizer;
