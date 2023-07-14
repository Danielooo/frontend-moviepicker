import React, { useState, useEffect, useContext } from 'react';
import { findActorIdByName, findMoviesByActorId } from '../../helpers/ApiRequests';
import MovieSelection from '../../components/movieselection/MovieSelection';
import Shortlist from '../../components/shortlist/ShortList';
import LoadingBar from "../../components/loadingbar/LoadingBar";
import PickedMovie from "../../components/pickedmovie/PickedMovie";

import { ShortlistContext } from "../../context/ShortlistContext";
import { Link } from "react-router-dom";

function Home() {
  const [actorName, setActorName] = useState('');
  const [actorId, setActorId] = useState(null);
  const [movies, setMovies] = useState([]);
  const { shortlist, setShortlist } = useContext(ShortlistContext);

  useEffect(() => {
    if (actorId) {
      findMoviesByActorId(actorId)
        .then(movieList => {
          const updatedMovies = movieList.map(movie => ({
            ...movie,
            isAdded: shortlist.some(item => item.id === movie.id)
          }));
          setMovies(updatedMovies);
        })
        .catch(error => console.error(error.message));
    }
  }, [actorId]);

  const handleInputChange = (e) => {
    setActorName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actorName) {
      findActorIdByName(actorName)
        .then(id => {
          setActorId(id);
          return findMoviesByActorId(id);
        })
        .then(movieList => {
          const updatedMovies = movieList.map(movie => ({
            ...movie,
            isAdded: shortlist.some(item => item.id === movie.id)
          }));
          setMovies(updatedMovies);
        })
        .catch(error => console.error(error.message));
    }
  };

  const addToShortList = (movie) => {
    setShortlist(prevShortlist => [...prevShortlist, { ...movie, disabled: true }]);
    const updatedMovies = movies.map(m =>
      m.id === movie.id ? { ...m, isAdded: true } : m
    );
    setMovies(updatedMovies);
  };

  function handleDeleteMovie(movie) {
    setShortlist(prevShortlist => prevShortlist.filter(item => item.id !== movie.id));
    const updatedMovies = movies.map(m =>
      m.id === movie.id ? { ...m, isAdded: false } : m
    );
    setMovies(updatedMovies);
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

      <Link to={"/randomizer"}>Randomizer</Link>
    </>
  );
}

export default Home;
