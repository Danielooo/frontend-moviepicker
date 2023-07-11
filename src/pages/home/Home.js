import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Form vraagt om input naam acteur
// Endpoint vraagt om acteur id, findActorIdByName vindt id op basis van naam
// Op basis van acteur worden tien populairste films getoond
// Uit die selectie van 10 wordt 1 film random als suggestie gegeven

function Home() {
  const [actorName, setActorName] = useState('');
  const [actorId, setActorId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;


  useEffect(() => {
    if (actorName) {
      findActorIdByName(actorName)
        .then(id => {
          setActorId(id);
          return findMoviesByActorId(id);
        })
        .then(movieList => {
          setMovies(movieList);
          setRandomMovie(getRandomMovieFromList(movieList));
        })
        .catch(error => console.error(error.message));
    }
  }, [actorName]);

  async function findActorIdByName( name ) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/person?api_key=${ apiKey }&query=${ name }`
      );

      if (response.status === 200) {
        const data = response.data;
        if (data.results.length > 0) {
          const actor = data.results[0];
          return actor.id;
        }
      }
      throw new Error(`Actor not found or error finding actor: ${ response.status }`);
    } catch (error) {
      throw new Error(`Error finding actor: ${ error.message }`);
    }
  }

  async function findMoviesByActorId(id) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_cast=${id}&sort_by=popularity.desc&language=en-US&page=1`
      );

      if (response.status === 200) {
        const data = response.data;
        return data.results.slice(0, 10);
      }
      throw new Error(`Error finding movies: ${response.status}`);
    } catch (error) {
      throw new Error(`Error finding movies: ${error.message}`);
    }
  }


  function getRandomMovieFromList(movieList) {
    const randomIndex = Math.floor(Math.random() * movieList.length);
    return movieList[randomIndex];
  }

  function handleInputChange(e) {
    setActorName(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Perform search when the form is submitted
    if (actorName) {
      findActorIdByName(actorName)
        .then(id => {
          setActorId(id);
          return findMoviesByActorId(id);
        })
        .then(movieList => {
          setMovies(movieList);
          setRandomMovie(getRandomMovieFromList(movieList));
        })
        .catch(error => console.error(error.message));
    }
  };

  return (
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
        <div>
          <p>Actor ID: {actorId}</p>
          <h2>Movies:</h2>
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
          {randomMovie && (
            <div>
              <h2>Random Movie:</h2>
              <p>Title: {randomMovie.title}</p>
              <p>Overview: {randomMovie.overview}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
