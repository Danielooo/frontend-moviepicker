import React, { useState, useEffect, useContext, Suspense } from 'react';
import axios from 'axios';

import './MovieSearch.css';

// helper imports
import { getActorIdByName, getMoviesByActorId } from "../../helpers/actorSearch";
import { getGenresAndIdsOfApi, getGenreIdByInput, getMoviesByGenreId } from "../../helpers/genreSearch";
import { getMoviesByDecade } from "../../helpers/decadeSearch";
import { getMoviesByTitle } from "../../helpers/titleSearch";

// component imports
import ShortList from "../../components/shortlist/ShortList.jsx";
import SearchOnActor from "../../components/searchonactor/SearchOnActor.jsx";
import SearchOnGenre from "../../components/searchongenre/SearchOnGenre.jsx";
import SearchOnDecade from "../../components/searchondecade/SearchOnDecade.jsx";
import MovieSelection from "../../components/movieselection/MovieSelection.jsx";
import InfoButton from "../../components/infobutton/InfoButton.jsx";
import SearchOnTitle from "../../components/searchontitle/SearchOnTitle.jsx";

// misc imports


// context imports
import { ShortlistContext } from "../../context/ShortlistContext.jsx";
import { MoviesContext } from "../../context/MoviesContext.jsx";


export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APP_AUTH_TOKEN}`,
    },
};


function MovieSearch() {
    
    // Actor search
    const [ actorName, setActorName ] = useState( '' );
    const [ actorId, setActorId ] = useState( 0 );
    const [ errorActor, toggleErrorActor ] = useState( false );
    
    // Genre search
    const [ genreAndIdListOfApi, setGenreAndIdListOfApi ] = useState( [] );
    const [ genreChoice, setGenreChoice ] = useState( 'Action' );
    const [ genreChoiceId, setGenreChoiceId ] = useState( 0 );
    const [ errorGenreList, toggleErrorGenreList ] = useState( false );
    const [ errorGenre, toggleErrorGenre ] = useState( false );
    
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
    
    
    // Api endpoint header
    
    
    //  =========================
    //  ===  FUNCTIES  ACTOR  ===
    //  =========================
    
    
    useEffect( () => {
        toggleLoading( true );
        
        if ( actorId ) {
            void getMoviesByActorId( toggleErrorActor, toggleLoading, setMovies, actorId );
        }
        toggleLoading( false );
        
    }, [ actorId ] );
    
    
    //  =========================
    //  ===  FUNCTIES  TITEL  ===
    //  =========================
    
    
    //  =========================
    //  ===  FUNCTIES GENRE  ====
    //  =========================
    
    // Mount only
    useEffect( () => {
        void getGenresAndIdsOfApi( setGenreAndIdListOfApi, toggleErrorGenreList );
        
    }, [] );
    
    
    useEffect( () => {
        
        if ( genreChoiceId !== undefined ) {
            void getMoviesByGenreId( setMovies, toggleLoading, toggleErrorGenre, genreChoiceId );
        } else {
            // TODO uitzondering bedenken of else verwijderen
        }
        
        toggleLoading( false );
    }, [ genreChoiceId ] );
    
    
    // =========================
    // ===  FUNCTIES DECADE  ===
    // =========================
    
    // In helper decadeSearch.js
    
    
    //  ========================
    //  ===  HANDLE SUBMITS  ===
    //  ========================
    
    function handleActorSubmit( e ) {
        e.preventDefault();
        void getActorIdByName( toggleErrorActor, toggleLoading, setActorId, actorName );
    }
    
    function handleGenreSubmit( e ) {
        e.preventDefault();
        void getGenreIdByInput( toggleLoading, toggleErrorGenre, setGenreChoiceId, genreAndIdListOfApi, genreChoice );
    }
    
    function handleDecadeSubmit( e ) {
        e.preventDefault();
        void getMoviesByDecade( setMovies, selectedDecade, toggleLoading, toggleErrorDecade );
    }
    
    function handleTitleSubmit( e ) {
        e.preventDefault();
        void getMoviesByTitle( toggleErrorTitle, toggleLoading, setMovies, title );
    }
    
    
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
                <div className='sections-container'>
                    
                    {/*Movie Search  */}
                    
                    <section className='section-container section-set-width'>
                        <div className='title-and-infobutton-line'>
                            <h1
                                className='section-title'
                                id='movie-search'
                            >Movie Search</h1>
                            
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
                    
                    <section className='section-container section-set-width'>
                        <ShortList
                            setMovies={setMovies}
                            linkToRandomizePage={true}
                        />
                    </section>
                </div>
                
                
                {/* end sections-container */}
                
                {/* Movie selection */}
                
                <section className='movie-selection section-container'>
                    <div className='section-inner-container'>
                        <h1 className='section-title'>Movie Selection</h1>
                        <Suspense fallback={'Loading.'}>
                            <MovieSelection
                                loading={loading}
                                movies={movies}
                                setMovies={setMovies}
                            />
                        </Suspense>
                    </div>
                </section>
            </div>
        </>
    
    );
}

export default MovieSearch;


