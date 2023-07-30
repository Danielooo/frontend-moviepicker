import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { ShortlistContext } from "../../context/ShortlistContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function MovieSearch() {
  const navigate = useNavigate();

  // Actor search
  const [ actorName, setActorName ] = useState('');
  const [ actorId, setActorId ] = useState(0)
  const [ errorActor, toggleErrorActor ] = useState(false)

  // Genre search
  const [ genreAndIdListOfApi, setGenreAndIdListOfApi ] = useState([])
  const [ genreChoice, setGenreChoice ] = useState('');
  const [ genreChoiceId, setGenreChoiceId ] = useState(0)
  const [ errorGenre, toggleErrorGenre ] = useState(false)

  // Decade search
  const [selectedDecade, setSelectedDecade] = useState('2020s');
  const decades = [ '2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s',
                    '1950s', '1940s', '1930s', '1920s', '1910s', '1900s'];
  const [ errorDecade, toggleErrorDecade ] = useState(false)

  // Misc
  const [ loading, toggleLoading ] = useState(false);
  const [ movies, setMovies ] = useState([]);
  const { shortlist, setShortlist } = useContext(ShortlistContext);


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN_ACTOR}`,
    },
  };

  //  =========================
  //  ===  FUNCTIES  ACTOR  ===
  //  =========================
  async function getActorIdByName() {
    try {
      toggleErrorActor(false)
      toggleLoading(true)

      const response = await axios.get(`https://api.themoviedb.org/3/search/person?query=${actorName}`, options)
      setActorId(response.data.results[0].id)


    } catch (e) {
      toggleErrorActor(true)
      toggleLoading(false)
      console.error(e)
    }
  }

  useEffect(() => {
    toggleLoading(true)

    async function getMoviesByActorId(actorId) {
      try {
        toggleErrorActor(false)

        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_cast=${actorId}&sort_by=popularity.desc&page=1?include_adult=false`, options)

        setMovies(response.data.results) // array met movies
        // console.log('movies: ', movies)
      } catch (e) {
        toggleErrorActor(true)
        toggleLoading(false)
        console.error(e)
      }
    }
    if (actorId) {
      void getMoviesByActorId(actorId)
    }
    toggleLoading(false)

  }, [actorId])


  //  =========================
  //  ===  FUNCTIES GENRE  ====
  //  =========================

  // Mount only
  useEffect(() => {
    async function getGenresAndIdsOfApi() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', options)

        setGenreAndIdListOfApi(response.data.genres)
      } catch (e) {
        console.error(e)
      }
    }

    void getGenresAndIdsOfApi()
  }, [])


  // Step 1  // Genre
  function getGenreIdByInput() {
    toggleLoading(true)

    if (genreAndIdListOfApi.length > 0 && genreChoice) {
      try {

        const genre = genreAndIdListOfApi.find(genre => genre.name.toLowerCase() === genreChoice.toLowerCase());
        setGenreChoiceId(genre.id);

      } catch (e) {
        toggleLoading(false)
        toggleErrorGenre(true)
        console.error(e)
      }
    }
  }

  // Step 2  // Genre
  useEffect(() => {
    async function getMoviesByGenreId() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreChoiceId}&sort_by=popularity.desc&page=1?include_adult=false`, options)

        // console.log('getMoviesByGenreId: ', response.data, genreChoiceId)

        setMovies(response.data.results)
      } catch (e) {
        toggleLoading(false)
        toggleErrorGenre(true)
        console.error(e)
      }
    }

    if (genreChoiceId !== undefined) {
      void getMoviesByGenreId()
    } else {
      console.log('genreChoiceId is undefined: ', genreChoiceId)
    }

    toggleLoading(false)
  }, [genreChoiceId])


  // =========================
  // ===  FUNCTIES DECADE  ===
  // =========================

  async function fetchMoviesByDecade() {
    try {
      toggleLoading(true);
      toggleErrorDecade(false)

      const currentYear = new Date().getFullYear();
      const startYear = getStartYearForDecade(selectedDecade, currentYear);
      const endYear = startYear + 9;

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${startYear}&primary_release_date.lte=${endYear}&sort_by=popularity.desc&page=1?include_adult=false`, options
      );

      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      toggleErrorDecade(true)
    }

    toggleLoading(false);
  };

  // >>>  helper  <<<
  const getStartYearForDecade = (selectedDecade, currentYear) => {
    switch (selectedDecade) {
      case '2020s':
        return 2020;
      case '2010s':
        return 2010;
      case '2000s':
        return 2000;
      case '1990s':
        return 1990;
      case '1980s':
        return 1980;
      case '1970s':
        return 1970;
      case '1960s':
        return 1960;
      case '1950s':
        return 1950;
      case '1940s':
        return 1940;
      case '1930s':
        return 1930;
      case '1920s':
        return 1920;
      case '1910s':
        return 1910;
      case '1900s':
        return 1900;
      // Add more cases if needed
      default:
        return currentYear;
    }
  };

    //  ========================
    //  ===  HANDLE SUBMITS  ===
    //  ========================

  function handleActorSubmit(e) {
    e.preventDefault();
    void getActorIdByName();
  }

  function handleGenreSubmit(e) {
      e.preventDefault();
      void getGenreIdByInput();
  }

  function handleDecadeSubmit(e) {
    e.preventDefault()
    void fetchMoviesByDecade();
  }

  function handleClickWheel(e) {
    e.preventDefault()
    navigate('/wheel')
  }

    // ===================
    // ===  SHORTLIST  ===
    // ===================

  // >>>  helper  <<<
  function handleAddToShortlist(movie) {
    setShortlist((prevShortlist) => [...prevShortlist, movie]);
    setMovies((prevMovies) =>
      prevMovies.map((prevMovie) =>
        prevMovie.id === movie.id ? {...prevMovie, isAdded: true} : prevMovie
      )
    );
  }


  function handleRemoveFromShortlist(movie) {
    setShortlist((prevShortlist) =>
      prevShortlist.filter((prevMovie) => prevMovie.id !== movie.id)
    );
    setMovies((prevMovies) =>
      prevMovies.map((prevMovie) =>
        prevMovie.id === movie.id ? {...prevMovie, isAdded: false} : prevMovie
      )
    );
  }

  function isMovieInShortlist(movieId) {
    return shortlist.some((item) => item.id === movieId);
  }

      //  ================
      //  ===  RETURN  ===
      //  ================

    return (
      <div>
        <h1>Movie Search</h1>

        {/*component*/}
        <NavLink to='/wheel'>Wheel</NavLink>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'blue',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={handleClickWheel}
        >
          Randomize
        </button>

        {/*component*/}
        <form onSubmit={handleActorSubmit}>
          <label htmlFor="actorNameInput">Actor Name:</label>
          <input
            type="text"
            id="actorNameInput"
            value={actorName}
            onChange={(e) => setActorName(e.target.value)}
          />
          <button type="submit">Search Actor</button>
        </form>
        {errorActor && <p>Acteur fout gespeld of technische fout. Voer opnieuw in</p>}


        { genreAndIdListOfApi.length > 0 &&
          <>
            {/*component*/}
            <form onSubmit={handleGenreSubmit}>
              <label htmlFor="genreInput">Genre:</label>
              <select
                id="genreInput"
                value={ genreChoice }
                onChange={(e) => setGenreChoice(e.target.value)}
              >
                <option value=''>Select a genre</option>
                  {genreAndIdListOfApi.map((genre) => (
                    <option key={genre.id} value={genre.name}>
                      {genre.name}
                    </option>
                ))}
              </select>
              <button type='submit'>Search Genre</button>
            </form>
            { errorGenre && <p>Fout bij het kiezen van een genre. Probeer opnieuw</p> }
          </>
        }

        {/*  DECADE  */}

        {/*component*/}
        <div>
          <form onSubmit={handleDecadeSubmit}>
            <label htmlFor='DecadeInput'>Decade: </label>
            <select
              id='DecadeInput'
              value={selectedDecade}
              onChange={(e) => setSelectedDecade(e.target.value)}
            >
              {decades.map((decade) => (
                <option key={decade} value={decade}>
                  {decade}
                </option>
              ))}
            </select>
            <button type='submit'>Search Decade</button>
          </form>
          { errorDecade && <p>Fout bij het kiezen van een decennium. Probeer opnieuw</p> }
        </div>

        <div>
          { loading === true && <h3>Loading...</h3>}
          { movies.length > 0 &&  movies.map((movie) => (
            // component
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Release Year: {movie.release_date}</p>
              <button
                onClick={() => handleAddToShortlist(movie)}
                disabled={isMovieInShortlist(movie.id)}
              >
                {isMovieInShortlist(movie.id) ? 'Added' : 'Add to Shortlist'}
              </button>
            </div>
          ))}
        </div>

        { shortlist.length > 0 &&
          <>
            {/*component*/}
            <h2>Shortlist</h2>

            {shortlist.map((movie) => (
              <>
                {/*Only CSS can show the button and movie.title on one line*/}
                <div key={movie.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <button onClick={() => handleRemoveFromShortlist(movie)}>
                  -
                  </button>
                  <p>
                    {movie.title}
                  </p>
                </div>

              </>
            ))}
          </>
        }
      </div>


    );
}

export default MovieSearch;
