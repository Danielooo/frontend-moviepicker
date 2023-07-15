import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieSearch() {
  const [actorName, setActorName] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState([]);
  const [shortlist, setShortlist] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;
  const baseURL = 'https://api.themoviedb.org/3';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
    },
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    void fetchData();
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const getActorIdByName = async (actorName) => {


    try {
      const response = await axios.get(`${baseURL}/search/person`, {
        params: {
          query: actorName,
          options,
        },
      });

      if (response.status === 200) {
        const actorResults = response.data.results;
        if (actorResults.length > 0) {
          const actor = actorResults[0];
          return actor.id;
        }
      }

      throw new Error('Actor not found');
    } catch (error) {
      throw new Error(`Error retrieving actor ID: ${error.message}`);
    }
  };

  const fetchData = async () => {
    try {
      let actorId = null;
      if (actorName) {
        actorId = await getActorIdByName(actorName);
      }

      const response = await axios.get(`${baseURL}/discover/movie`, {
        params: {
          with_cast: actorId,
          with_genres: genre,
          primary_release_year: year,
          sort_by: 'popularity.desc',
          language: 'en-US',
          options,
        },
      });

      if (response.status === 200) {
        setMovies(response.data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToShortlist = (movie) => {
    setShortlist((prevShortlist) => [...prevShortlist, movie]);
    setMovies((prevMovies) =>
      prevMovies.map((prevMovie) =>
        prevMovie.id === movie.id ? { ...prevMovie, isAdded: true } : prevMovie
      )
    );
  };

  const handleRemoveFromShortlist = (movie) => {
    setShortlist((prevShortlist) =>
      prevShortlist.filter((prevMovie) => prevMovie.id !== movie.id)
    );
    setMovies((prevMovies) =>
      prevMovies.map((prevMovie) =>
        prevMovie.id === movie.id ? { ...prevMovie, isAdded: false } : prevMovie
      )
    );
  };

  return (
    <div>
      <h1>Movie Search</h1>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="actorNameInput">Actor Name:</label>
        <input
          type="text"
          id="actorNameInput"
          value={actorName}
          onChange={(e) => setActorName(e.target.value)}
        />

        <label htmlFor="genreInput">Genre:</label>
        <input
          type="text"
          id="genreInput"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <label htmlFor="yearInput">Year:</label>
        <input
          type="text"
          id="yearInput"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>Release Year: {movie.release_date}</p>
            <button
              onClick={() => handleAddToShortlist(movie)}
              disabled={movie.isAdded}
            >
              {movie.isAdded ? 'Added' : 'Add to Shortlist'}
            </button>
          </div>
        ))}
      </div>

      <h2>Shortlist</h2>
      <ul>
        {shortlist.map((movie) => (
          <li key={movie.id}>
            {movie.title}
            <button onClick={() => handleRemoveFromShortlist(movie)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieSearch;
