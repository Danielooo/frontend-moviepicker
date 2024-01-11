import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import axios from 'axios';

import styles from './MovieSearch.module.css';

// helper imports
import getStartYearForDecade from '../../helpers/getStartYearForDecade.js';
// import fetchData from '../../helpers/useFetch.js';

// component imports
import ShortList from "../../components/shortlist/ShortList.jsx";
import SearchOnActor from "../../components/searchonactor/SearchOnActor.jsx";
import SearchOnGenre from "../../components/searchongenre/SearchOnGenre.jsx";
import SearchOnTitle from "../../components/searchontitle/SearchOnTitle.jsx";
import SearchOnDecade from "../../components/searchondecade/SearchOnDecade.jsx";
import MovieSelection from "../../components/movieselection/MovieSelection.jsx";
import InfoButton from "../../components/infobutton/InfoButton.jsx";

// context imports
import { ShortlistContext } from "../../context/ShortlistContext.jsx";
import { MoviesContext } from "../../context/MoviesContext.jsx";
import useFetch from '../../helpers/useFetch.js';

// config for api requests
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APP_AUTH_TOKEN}`,
    },
};


function MovieSearch() {
    const [ url, setUrl ] = useState( null );
    const { dataFetch, loadingFetch, errorFetch } = useFetch( url );
    
    // Actor search
    const [ actorName, setActorName ] = useState( '' );
    const [ actorId, setActorId ] = useState( 0 );
    const [ errorActor, setErrorActor ] = useState( '' );
    
    // Genre search
    const [ genreAndIdListOfApi, setGenreAndIdListOfApi ] = useState( [] );
    const [ genreChoice, setGenreChoice ] = useState( 'Action' );
    const [ genreChoiceId, setGenreChoiceId ] = useState( 0 );
    const [ errorGenreList, toggleErrorGenreList ] = useState( false );
    const [ errorGenre, toggleErrorGenre ] = useState( false );
    const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list';
    
    // Decade search
    const [ errorDecade, toggleErrorDecade ] = useState( false );
    const [ selectedDecade, setSelectedDecade ] = useState( '2020s' );
    const decades = [
        '2020s', '2010s', '2000s', '1990s', '1980s', '1970s', '1960s',
        '1950s', '1940s', '1930s', '1920s', '1910s', '1900s'
    ];
    
    // Title search
    const [ title, setTitle ] = useState( '' );
    const [ errorTitle, toggleErrorTitle ] = useState( false );
    
    // Misc
    const [ loading, toggleLoading ] = useState( false );
    const { movies, setMovies } = useContext( MoviesContext );
    const { handleRemoveFromShortlist, handleAddToShortlist, isMovieInShortlist } = useContext( ShortlistContext );
    
    
    // Custom hook
    useEffect( () => {
        if ( dataFetch ) {
            setMovies( dataFetch.results );
        }
    }, [ dataFetch ] );
    
    useEffect( () => {
        console.log( 'errorFetch: ', errorFetch );
        
    }, [ errorFetch ] );
    
    //  =========================
    //  ===  FUNCTIES  ACTOR  ===
    //  =========================
    
    function handleActorSubmit( e ) {
        e.preventDefault();
        setErrorActor( '' );
        
        
        async function getActorIdByName() {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/person?query=${actorName}`, options );
                setActorId( response.data.results[ 0 ].id );
                
            } catch ( e ) {
                console.error( e );
                console.log( '1 reach' );
                // if actorName empty or just spaces
                if ( !actorName.trim() ) {
                    setErrorActor( 'Nothing filled in. Please enter name of actor' );
                } else {
                    console.log( 'reached' );
                    setErrorActor( 'No actor id found. Please check input spelling and try again' );
                }
            }
        }
        
        void getActorIdByName();
    }
    
    useEffect( () => {
        const actorUrl = `https://api.themoviedb.org/3/discover/movie?with_cast=${actorId}&sort_by=vote_average.desc&vote_average.gte=7.0&vote_count.gte=200&page=1?include_adult=false`;
        setUrl( actorUrl );
    }, [ actorId ] );
    
    
    //  =========================
    //  ===  FUNCTIES GENRE  ====
    //  =========================
    
    // get all genres for dropdown
    useEffect( () => {
        toggleErrorGenreList( false );
        
        async function getGenresAndIdsOfApi() {
            try {
                const response = await axios.get( 'https://api.themoviedb.org/3/genre/movie/list', options );
                
                setGenreAndIdListOfApi( response.data.genres );
            } catch ( e ) {
                toggleErrorGenreList( true );
                console.error( e );
            }
        }
        
        void getGenresAndIdsOfApi();
    }, [] );
    
    // Makes api request for movie selection by genre id
    useEffect( () => {
        const genreUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreChoiceId}&sort_by=vote_average.desc&vote_average.gte=7.0&vote_count.gte=200&page=1?include_adult=false`;
        setUrl( genreUrl );
    }, [ genreChoiceId ] );
    
    
    function handleGenreSubmit( e ) {
        e.preventDefault();
        if ( genreAndIdListOfApi.length > 0 && genreChoice ) {
            try {
                const genre = genreAndIdListOfApi.find(
                    genre => genre.name.toLowerCase() === genreChoice.toLowerCase() );
                setGenreChoiceId( genre.id );
                
            } catch ( e ) {
                toggleLoading( false );
                toggleErrorGenre( true );
                console.error( e );
            }
        }
    }
    
    //  =========================
    //  ===  FUNCTIES  TITEL  ===
    //  =========================
    
    function handleTitleSubmit( e ) {
        e.preventDefault();
        const titleUrl = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&page=1`;
        console.log( 'titleUrl: ', titleUrl );
        setUrl( titleUrl );
    }
    
    
    // =========================
    // ===  FUNCTIES DECADE  ===
    // =========================
    
    function handleDecadeSubmit( e ) {
        e.preventDefault();
        const currentYear = new Date().getFullYear();
        const startYear = getStartYearForDecade( selectedDecade, currentYear );
        const endYear = startYear + 9;
        const decadeUrl = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${startYear}&primary_release_date.lte=${endYear}&sort_by=vote_average.desc&vote_average.gte=7.0&vote_count.gte=200&page=1?include_adult=false`;
        setUrl( decadeUrl );
    }
    
    
    //  ================
    //  ===  RETURN  ===
    //  ================
    
    
    return (
        
        <>
            <div className={styles[ 'max-width-container' ]}>
                <div className='sections-container'>
                    
                    {/*Movie Search  */}
                    
                    <section className={`section-container ${styles[ 'section-set-width' ]}`}>
                        <div className={styles[ 'title-and-infobutton-line' ]}>
                            <h1
                                className='section-title'
                                id='movie-search'
                            >Movie Search</h1>
                            
                            <InfoButton
                                text={`You can search on Actor, Genre, Decade and Title.\nCombining search queries is not possible.\nThe results in Movie Selection are the 20 best rated movies that have a minimum of 200 votes`}
                            />
                        </div>
                        
                        <SearchOnActor
                            handleActorSubmit={handleActorSubmit}
                            actorName={actorName}
                            setActorName={setActorName}
                            errorActor={errorActor}
                        />
                        
                        
                        {/*/!*  GENRE  *!/*/}
                        
                        <SearchOnGenre
                            genreAndIdListOfApi={genreAndIdListOfApi}
                            errorGenreList={errorGenreList}
                            errorGenre={errorGenre}
                            handleGenreSubmit={handleGenreSubmit}
                            genreChoice={genreChoice}
                            setGenreChoice={setGenreChoice}
                        />
                        
                        {/*/!*  DECADE  *!/*/}
                        
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
                    
                    <section className={`section-container ${styles[ 'section-set-width' ]}`}>
                        <ShortList
                            setMovies={setMovies}
                            linkToRandomizePage={true}
                        />
                    </section>
                </div>
                
                
                {/* end sections-container */}
                
                {/* Movie selection */}
                
                <section className={`${styles[ 'movie-selection' ]} section-container`}>
                    <div className='section-inner-container'>
                        <h1 className='section-title'>Movie Selection</h1>
                        
                        {movies &&
                            <MovieSelection
                                loading={loading}
                                movies={movies}
                                setMovies={setMovies}
                            />
                            
                        }
                    </div>
                </section>
            </div>
        </>
    
    );
}

export default MovieSearch;


