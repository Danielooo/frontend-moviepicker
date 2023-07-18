import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function MovieSearch() {
  const [loading, toggleLoading] = useState(false);
  const [error, toggleError] = useState(false);

  const [actorName, setActorName] = useState('');
  const [actorId, setActorId ] = useState(0)
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState([]);
  const [shortlist, setShortlist] = useState([]);

  const baseURL = 'https://api.themoviedb.org/3';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN_ACTOR}`,
    },
  };

  // TODO write test api call
  // TODO rewrite useEffect with toggleError and toggleLoading

  // TEST werkend endpoint met api key (ipv auth token)
  // https://api.themoviedb.org/3/discover/movie?with_cast=206&sort_by=popularity.desc&language=en-US&page=1&api_key=460ee6d69d8ce03efd406954eb79c98e

  //  ###  FUNCTIES  ###
  async function getActorIdByName() {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/person?query=${actorName}`, options)
      setActorId(response.data.results[0].id)


    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    async function getMoviesByActorId(actorId) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_cast=${actorId}&sort_by=popularity.desc&language=en-US&page=1`, options)

        setMovies(response.data.results) // array met movies
        console.log('movies: ', movies)
      } catch (e) {
        console.error(e)
      }
    }
    if (actorId) {
      void getMoviesByActorId(actorId)
    }

  }, [actorId])




    function handleAddToShortlist(movie) {
      setShortlist((prevShortlist) => [...prevShortlist, movie]);
      setMovies((prevMovies) =>
        prevMovies.map((prevMovie) =>
          prevMovie.id === movie.id ? {...prevMovie, isAdded: true} : prevMovie
        )
      );
    };

    // function handleRemoveFromShortlist(movie) {
    //   setShortlist((prevShortlist) =>
    //     prevShortlist.filter((prevMovie) => prevMovie.id !== movie.id)
    //   );
    //   setMovies((prevMovies) =>
    //     prevMovies.map((prevMovie) =>
    //       prevMovie.id === movie.id ? {...prevMovie, isAdded: false} : prevMovie
    //     )
    //   );
    // };

    function getMoviesByGenre(genreId) {

    }

    function getGenreIdByGenreName() {

    }

    // ===  HANDLE SUBMITS  ===
    function handleActorSubmit(e) {
      e.preventDefault();
      void getActorIdByName();
    }

    function handleGenreSubmit(e) {
      e.preventDefault();
    }

    // ===  FUNCTIONS  ===

    return (
      <div>
        <h1>Movie Search</h1>

        <form onSubmit={handleActorSubmit}>
          <label htmlFor="actorNameInput">Actor Name:</label>
          <input
            type="text"
            id="actorNameInput"
            value={actorName}
            onChange={(e) => setActorName(e.target.value)}
          />
        </form>

        <form onSubmit={handleGenreSubmit}>
          <label htmlFor="genreInput">Genre:</label>
          <input
            type="text"
            id="genreInput"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </form>

          {/*<label htmlFor="yearInput">Year:</label>*/}
          {/*<input*/}
          {/*  type="text"*/}
          {/*  id="yearInput"*/}
          {/*  value={year}*/}
          {/*  onChange={(e) => setYear(e.target.value)}*/}
          {/*/>*/}

          <button type="submit">Search</button>


        <div>
          {movies.length > 0 &&  movies.map((movie) => (
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

      {/*  <h2>Shortlist</h2>*/}
      {/*  <ul>*/}
      {/*    {shortlist.map((movie) => (*/}
      {/*      <li key={movie.id}>*/}
      {/*        {movie.title}*/}
      {/*        <button onClick={() => handleRemoveFromShortlist(movie)}>*/}
      {/*          Remove*/}
      {/*        </button>*/}
      {/*      </li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      </div>

    );
}


export default MovieSearch;
