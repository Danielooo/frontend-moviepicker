import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from "react-router-dom";

// helper imports
import { getActorIdByName, getMoviesByActorId } from "../../helpers/actorsearch/ActorSearch";
import { getGenresAndIdsOfApi, getGenreIdByInput, getMoviesByGenreId } from "../../helpers/genresearch/GenreSearch";

// component imports
import ShortList from "../../components/shortlist/ShortList";
import SearchOnActor from "../../components/searchonactor/SearchOnActor";
import SearchOnGenre from "../../components/searchongenre/SearchOnGenre";
import SearchOnDecade from "../../components/searchondecade/SearchOnDecade";
import MovieSelection from "../../components/movieselection/MovieSelection";

// misc imports
import { ShortlistContext } from "../../context/ShortlistContext";
import { getMoviesByDecade } from "../../helpers/decadesearch/DecadeSearch";

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

    // // check function
    // useEffect(() => {
    //   console.log('movies: ', movies)
    //
    // }, [movies])

    return (
      <div>
        <h1>Movie Search</h1>

        {/*component*/}
        <NavLink to='/wheel'>Wheel</NavLink>
        <button
          onClick={handleClickWheel}
        >
          Wheel
        </button>


        <SearchOnActor
          handleActorSubmit={handleActorSubmit}
          actorName={actorName}
          setActorName={setActorName}
          errorActor={errorActor}
        />


        {/*  GENRE  */}

        <SearchOnGenre
          genreAndIdListOfApi={genreAndIdListOfApi}
          errorGenreList={errorGenreList}
          errorGenre={errorGenre}
          handleGenreSubmit={handleGenreSubmit}
          genreChoice={genreChoice}
          setGenreChoice={setGenreChoice}
        />

          {/*  DECADE  */}

        <SearchOnDecade
          handleDecadeSubmit={handleDecadeSubmit}
          selectedDecade={selectedDecade}
          setSelectedDecade={setSelectedDecade}
          decades={decades}
          errorDecade={errorDecade}
        />


        <MovieSelection
          loading={loading}
          movies={movies}
          handleAddToShortlist={handleAddToShortlist}
          isMovieInShortlist={isMovieInShortlist} />

        <div>
          <ShortList shortlist={shortlist} handleRemoveFromShortlist={handleRemoveFromShortlist} />
        </div>

      </div>
    );
}

export default MovieSearch;
