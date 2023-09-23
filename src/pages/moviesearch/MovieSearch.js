import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, NavLink} from "react-router-dom";

import './MovieSearch.css';
import './../../App.css';

// helper imports
import {getActorIdByName, getMoviesByActorId} from "../../helpers/actorsearch/ActorSearch";
import {getGenresAndIdsOfApi, getGenreIdByInput, getMoviesByGenreId} from "../../helpers/genresearch/GenreSearch";

// component imports
import ShortList from "../../components/shortlist/ShortList";
import SearchOnActor from "../../components/searchonactor/SearchOnActor";
import SearchOnGenre from "../../components/searchongenre/SearchOnGenre";
import SearchOnDecade from "../../components/searchondecade/SearchOnDecade";
import MovieSelection from "../../components/movieselection/MovieSelection";
import InfoButton from "../../components/infobutton/InfoButton";

// misc imports
import {ShortlistContext} from "../../context/ShortlistContext";
import {getMoviesByDecade} from "../../helpers/decadesearch/DecadeSearch";
import Button from "../../components/button/Button";


function MovieSearch() {
    const navigate = useNavigate();
    
    // Actor search
    const [actorName, setActorName] = useState('Meryl Streep');
    const [actorId, setActorId] = useState(0)
    const [errorActor, toggleErrorActor] = useState(false)
    
    // Genre search
    const [genreAndIdListOfApi, setGenreAndIdListOfApi] = useState([])
    const [genreChoice, setGenreChoice] = useState('Action');
    const [genreChoiceId, setGenreChoiceId] = useState(0)
    const [errorGenreList, toggleErrorGenreList] = useState(false)
    const [errorGenre, toggleErrorGenre] = useState(false)
    
    // Decade search
    const [errorDecade, toggleErrorDecade] = useState(false)
    const [selectedDecade, setSelectedDecade] = useState('2020s');
    const decades = [
        '2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s',
        '1950s', '1940s', '1930s', '1920s', '1910s', '1900s'
    ];
    
    // Misc
    const [loading, toggleLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const {shortlist, setShortlist} = useContext(ShortlistContext);
    
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
            // TODO uitzondering bedenken of else verwijderen
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
    
    function handleClickRandomize(e) {
        e.preventDefault()
        navigate('/wheel')
    }
    
    function handleClearShortlist(e) {
        e.preventDefault()
        setShortlist([])
    }
    
    // ===================
    // ===  SHORTLIST  ===
    // ===================
    
    // >>>  helper  <<<
    function handleAddToShortlist(movie) {
        if (shortlist.length < 10) {
            setShortlist((prevShortlist) => [...prevShortlist, movie]);
            setMovies((prevMovies) =>
            prevMovies.map((prevMovie) =>
            prevMovie.id === movie.id ? {...prevMovie, isAdded: true} : prevMovie
            )
            );
        } else {
            alert('you can only have 10 movies in your Shortlist')
        }
        
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
    
    // TODO: build css from the ground up. Only Nav, Footer and part global.css is uncommented
    <>
        <div className='max-width-container'>
            <div className="sections-container">
                
                {/*Movie Search  */}
                
                <section className='section-container section-set-width'>
                    <div className='title-and-infobutton-line'>
                        <h2 className='section-title'>Movie Search</h2>
                        
                        <InfoButton
                        text={`You can search on Actor, Genre and Decade.\nCombining search queries is not possible.\nThe results in Movie Selection are the 20 best rated movies that have a minimum of 200 votes`}
                        />
                    </div>
                    
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
                </section>
                
                {/*Shortlist*/}
                
                <section className='section-container section-set-width'>
                    <ShortList handleRemoveFromShortlist={handleRemoveFromShortlist}
                    />
                </section>
            </div>
            
            
            {/*end sections-container*/}
            
            {/* Movie selection */}
            
            <section className='movie-selection section-container'>
                <div className='section-inner-container'>
                    <h1 className='section-title'>Movie Selection</h1>
                    <MovieSelection
                    loading={loading}
                    movies={movies}
                    handleAddToShortlist={handleAddToShortlist}
                    isMovieInShortlist={isMovieInShortlist}/>
                </div>
            </section>
        </div>
    </>
    
    )
}

export default MovieSearch;
