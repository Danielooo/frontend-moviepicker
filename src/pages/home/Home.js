import React, {useState, useEffect, useContext} from 'react';
import { findActorIdByName, findMoviesByActorId } from '../../helpers/ApiRequests';
import MovieSelection from '../../components/movieselection/MovieSelection';
import Shortlist from '../../components/shortlist/ShortList';
import LoadingBar from "../../components/loadingbar/LoadingBar";
import PickedMovie from "../../components/pickedmovie/PickedMovie";
// import { Link } from "react-router-dom";


import { ShortlistContext } from "../../context/ShortlistContext";

// TODO display random movie after load and show movie image

function Home() {
  const [ actorName, setActorName ] = useState('');
  const [ actorId, setActorId ] = useState(null);
  const [ movies, setMovies ] = useState([]);
  const [ showPickedMovie, setShowPickedMovie ] = useState(false);

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
    setShowPickedMovie(true);
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

      <div>
        {shortlist.length > 1 ? (
          <>
            <h1>Random movie generator</h1>
              <LoadingBar
                duration={4000}
                color="blue"
                height="20px"
                borderRadius="20px"
                onComplete={handleComplete}
              />
          </>
          )
          :
          <i>First add two or more movies to the shortlist</i>
        }
      </div>

      {showPickedMovie && movies.length > 0 && (
        <PickedMovie movies={movies} />
      )}
    </>
  );
}

export default Home;
