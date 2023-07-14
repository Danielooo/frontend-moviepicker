import React, {useState, useContext, useEffect} from 'react';
import LoadingBar from "../../components/loadingbar/LoadingBar";
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

        <LoadingBar
          duration={1000}
          color="blue"
          height="20px"
          borderRadius="20px"
          onComplete={getRandomMovie} // Pass the function reference
        />
        {randomMovie && <p>{randomMovie.title}</p>}
      </div>

      <Link to="/">Back to adding movies</Link>
    </>
  );
}

export default Randomizer;
