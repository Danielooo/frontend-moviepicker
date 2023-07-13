import React, {useState, useEffect, useContext} from 'react';
import { findActorIdByName, findMoviesByActorId } from '../../helpers/ApiRequests';
import MovieSelection from '../../components/movieselection/MovieSelection';
import Shortlist from '../../components/shortlist/ShortList';
import { Link } from "react-router-dom";
import LoadingBar from "../../components/loadingbar/LoadingBar";

import { ShortlistContext } from "../../context/ShortlistContext";


function Home() {
  const [actorName, setActorName] = useState('');
  const [actorId, setActorId] = useState(null);
  const [movies, setMovies] = useState([]);

  const { shortlist, setShortlist } = useContext( ShortlistContext )



  useEffect(() => {
    if (actorId) {
      findMoviesByActorId(actorId)
        .then(movieList => {
          const updatedMovies = movieList.map(movie => {
            if (shortlist.find(item => item.id === movie.id)) {
              return { ...movie, isAdded: true };
            }
            return movie;
          });
          setMovies(updatedMovies);
        })
        .catch(error => console.error(error.message));
    }
  }, [actorId, shortlist]);

  function handleInputChange(e) {
    setActorName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (actorName) {
      findActorIdByName(actorName)
        .then(id => {
          setActorId(id);
          return findMoviesByActorId(id);
        })
        .then(movieList => {
          const updatedMovies = movieList.map(movie => {
            if (shortlist.find(item => item.id === movie.id)) {
              return { ...movie, isAdded: true };
            }
            return movie;
          });
          setMovies(updatedMovies);
        })
        .catch(error => console.error(error.message));
    }
  }

  function addToShortList(movie) {
    setShortlist(prevShortList => [...prevShortList, { ...movie, disabled: true }]);
    const updatedMovies = movies.map(m => (m.id === movie.id ? { ...m, isAdded: true } : m));
    setMovies(updatedMovies);
  }

  function handleDeleteMovie(movie) {
    setShortlist(prevShortList => prevShortList.filter(item => item.id !== movie.id));
    const updatedMovies = movies.map(m => (m.id === movie.id ? { ...m, isAdded: false } : m));
    setMovies(updatedMovies);
  }

  function handleComplete() {
    console.log('Loading complete!'); // Executes once the loading bar has completed
  }

  return (
    <>
      <div>
        <h1>Home</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="actorNameInput">Actor Name:</label>
          <input
            type="text"
            id="actorNameInput"
            value={actorName}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>

        {actorId && (
          <MovieSelection
            actorId={actorId}
            movies={movies}
            addToShortList={addToShortList}
          />
        )}
      </div>

      <Shortlist shortlist={shortlist} handleDeleteMovie={handleDeleteMovie} />

      {/*<Link to='/carouselpage'>Link to carouselpage</Link>*/}

      <div>
        <h1>Loading Bar Example</h1>
        <LoadingBar
          duration={2000}
          color="blue"
          height="20px"
          borderRadius="20px"
          onComplete={handleComplete}
        />
      </div>


    </>
  );
}

export default Home;
