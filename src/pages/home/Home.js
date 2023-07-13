import React, { useState, useEffect } from 'react';
import { findActorIdByName, findMoviesByActorId } from '../../helpers/ApiRequests';
import MovieSelection from '../../components/movieselection/MovieSelection';
import Shortlist from '../../components/shortlist/ShortList';


function Home() {
  const [actorName, setActorName] = useState('');
  const [actorId, setActorId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [shortList, setShortList] = useState([]);

  useEffect(() => {
    if (actorId) {
      findMoviesByActorId(actorId)
        .then(movieList => {
          const updatedMovies = movieList.map(movie => {
            if (shortList.find(item => item.id === movie.id)) {
              return { ...movie, isAdded: true };
            }
            return movie;
          });
          setMovies(updatedMovies);
        })
        .catch(error => console.error(error.message));
    }
  }, [actorId, shortList]);

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
            if (shortList.find(item => item.id === movie.id)) {
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
    setShortList(prevShortList => [...prevShortList, { ...movie, disabled: true }]);
    const updatedMovies = movies.map(m => (m.id === movie.id ? { ...m, isAdded: true } : m));
    setMovies(updatedMovies);
  }

  function handleDeleteMovie(movie) {
    setShortList(prevShortList => prevShortList.filter(item => item.id !== movie.id));
    const updatedMovies = movies.map(m => (m.id === movie.id ? { ...m, isAdded: false } : m));
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

      <Shortlist shortList={shortList} handleDeleteMovie={handleDeleteMovie} />
    </>
  );
}

export default Home;
