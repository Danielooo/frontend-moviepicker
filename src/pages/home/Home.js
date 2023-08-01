import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import axios from 'axios';

// helper imports
import { getActorIdByName, getMoviesByActorId } from "../../helpers/actorsearch/ActorSearch";
import {getGenresAndIdsOfApi, getGenreIdByInput, getMoviesByGenreId} from "../../helpers/genresearch/GenreSearch";

// misc imports
import { ShortlistContext } from "../../context/ShortlistContext";
import {getMoviesByDecade} from "../../helpers/decadesearch/DecadeSearch";
import ShortList from "../../components/shortlist/ShortList";


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
  const [ errorGenreList, toggleErrorGenreList ] = useState(false)
  const [ errorGenre, toggleErrorGenre ] = useState(false)

  // Decade search
  const [ errorDecade, toggleErrorDecade ] = useState(false)
  const [selectedDecade, setSelectedDecade] = useState('2020s');
  const decades = [ '2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s',
                    '1950s', '1940s', '1930s', '1920s', '1910s', '1900s'];

  // Misc
  const [ loading, toggleLoading ] = useState(false);
  const [ movies, setMovies ] = useState([]);
  const { shortlist, setShortlist } = useContext(ShortlistContext);

  // Api endpoint header
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


  useEffect(() => {
    toggleLoading(true)

    if (actorId) {
      void getMoviesByActorId(toggleErrorActor, toggleLoading, setMovies, options, actorId)
    }
    toggleLoading(false)

  }, [actorId])


  //  =========================
  //  ===  FUNCTIES GENRE  ====
  //  =========================

  // Mount only
  useEffect(() => {
    void getGenresAndIdsOfApi(setGenreAndIdListOfApi, toggleErrorGenreList, options)

  }, [])


  useEffect(() => {

    if (genreChoiceId !== undefined) {
      void getMoviesByGenreId(setMovies, toggleLoading, toggleErrorGenre, genreChoiceId, options)
    } else {
      console.log('genreChoiceId is undefined: ', genreChoiceId)
    }

    toggleLoading(false)
  }, [genreChoiceId])


  // =========================
  // ===  FUNCTIES DECADE  ===
  // =========================

      // In helper DecadeSearch.js


  //  ========================
  //  ===  HANDLE SUBMITS  ===
  //  ========================

  function handleActorSubmit(e) {
    e.preventDefault();
    void getActorIdByName(toggleErrorActor, toggleLoading, setActorId, options, actorName)
  }

  function handleGenreSubmit(e) {
      e.preventDefault();
      void getGenreIdByInput(toggleLoading, toggleErrorGenre, setGenreChoiceId, genreAndIdListOfApi, genreChoice);
  }

  function handleDecadeSubmit(e) {
    e.preventDefault()
    void getMoviesByDecade(setMovies, selectedDecade, toggleLoading, toggleErrorDecade, options);
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


        { genreAndIdListOfApi.length > 0 && !errorGenreList && (
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
          )
        }
        { errorGenreList &&
          <p>There was an error fetching the genre options. Please try again.</p>
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

        {/*Movie Selection*/}
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

        <div>
          <ShortList shortlist={shortlist} handleRemoveFromShortlist={handleRemoveFromShortlist} />
        </div>

      </div>


    );
}

export default MovieSearch;
