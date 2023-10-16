import React, {useState, useEffect, useContext} from 'react';

import './MovieSearch.css';

// helper imports
import {getActorIdByName, getMoviesByActorId} from "../../helpers/actorsearch/ActorSearch";
import {getGenresAndIdsOfApi, getGenreIdByInput, getMoviesByGenreId} from "../../helpers/genresearch/GenreSearch";
import {getMoviesByDecade} from "../../helpers/decadesearch/DecadeSearch";
import {getMoviesByTitle} from "../../helpers/titlesearch/TitleSearch";

// component imports
import ShortList from "../../components/shortlist/ShortList";
import SearchOnActor from "../../components/searchonactor/SearchOnActor";
import SearchOnGenre from "../../components/searchongenre/SearchOnGenre";
import SearchOnDecade from "../../components/searchondecade/SearchOnDecade";
import MovieSelection from "../../components/movieselection/MovieSelection";
import InfoButton from "../../components/infobutton/InfoButton";
import SearchOnTitle from "../../components/searchontitle/SearchOnTitle";

<<<<<<< HEAD
// misc imports
import {ShortlistContext} from "../../context/ShortlistContext";
import {getMoviesByDecade} from "../../helpers/decadesearch/DecadeSearch";
import Button from "../../components/button/Button";
=======


// context imports
import {ShortlistContext} from "../../context/ShortlistContext";
import {MoviesContext} from "../../context/MoviesContext";
>>>>>>> 0871bb0 (added working favorites page)


function MovieSearch() {
    
    // Actor search
    const [actorName, setActorName] = useState('');
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
    
    // Title search
    const [title, setTitle] = useState('')
    const [errorTitle, toggleErrorTitle] = useState(false)
    
    // Misc
    const [loading, toggleLoading] = useState(false);
    const {movies, setMovies} = useContext(MoviesContext);
    const  {handleRemoveFromShortlist, handleAddToShortlist, isMovieInShortlist } = useContext(ShortlistContext);
    
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
    //  ===  FUNCTIES  TITEL  ===
    //  =========================
    
    
    
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
    
    function handleTitleSubmit(e) {
        e.preventDefault()
        void getMoviesByTitle(toggleErrorTitle, toggleLoading, setMovies, options, title)
    }
    
    // TODO: delete if shortlist functions work without
    // function handleClickRandomize(e) {
    //     e.preventDefault()
    //     navigate('/wheel')
    // }
    //
    // function handleClearShortlist(e) {
    //     e.preventDefault()
    //     setShortlist([])
    // }
    
    // ===================
    // ===  SHORTLIST  ===
    // ===================
    
    // >>>  helper  <<<
    
    
    //  ================
    //  ===  RETURN  ===
    //  ================
    
    
    return (
    
    <>
        <div className='max-width-container'>
            <div className="sections-container">
                
                {/*Movie Search  */}
                
                <section className='section-container section-set-width'>
                    <div className='title-and-infobutton-line'>
                        <h1 className='section-title' id='movie-search' >Movie Search</h1>
                        
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
                    
                    {/*  TITLE  */}
                    
                    <SearchOnTitle
                        handleTitleSubmit={handleTitleSubmit}
                        title={title}
                        setTitle={setTitle}
                        errorTitle={errorTitle}
                    />
                    
                </section>
                
                
                
                {/*Shortlist*/}
                
                <section className='section-container section-set-width'>
                    <ShortList setMovies={setMovies}
                    />
                </section>
            </div>
            
            
            {/* end sections-container */}
            
            {/* Movie selection */}
            
            <section className='movie-selection section-container'>
                <div className='section-inner-container'>
                    <h1 className='section-title'>Movie Selection</h1>
                    <MovieSelection
                        loading={loading}
                        movies={movies}
                        setMovies={setMovies}
                    />
                </div>
            </section>
        </div>
    </>
    
    )
}

export default MovieSearch;
