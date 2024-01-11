import React, { useContext, useEffect, useState } from 'react';
import Shortlist from '../../components/shortlist/ShortList.jsx';
import LoadingBar from '../../components/loadingBar/LoadingBar.jsx';
import MovieCard from '../../components/moviecard/MovieCard.jsx';
import getRandomInt from '../../helpers/getRandomInt.js';
import { Link } from 'react-router-dom';
import { ShortlistContext } from '../../context/ShortlistContext.jsx';
import styles from './Randomizer.module.css';
import Button from '../../components/button/Button.jsx';


function Randomizer() {
    const { shortlist } = useContext( ShortlistContext );
    
    const [ randomMovie, setRandomMovie ] = useState( {} );
    const [ loadingComplete, toggleLoadingComplete ] = useState( false );
    const [ lastRandomMovieIndex, setLastRandomMovieIndex ] = useState( undefined );
    
    function handleClick() {
        const randomMovieIndex = getRandomInt( 0, Object.keys( shortlist ).length - 1, lastRandomMovieIndex );
        
        setRandomMovie( shortlist[ randomMovieIndex ] );
        setLastRandomMovieIndex( randomMovieIndex );
    }
    
    
    return (
        <>
            <div>
                <h1 className='login-title'>Randomizer</h1>
                
                <section className='section-container section-set-width'>
                    <Shortlist linkToRandomizePage={false}/>
                </section>
            </div>
            
            {/*Na laden conditioneel renderen met loadingComplete */}
            {/*<LoadingBar*/}
            {/*    boolComplete={toggleLoadingComplete}*/}
            {/*/>*/}
            
            <div className={styles[ 'random-movie-container' ]}>
                {/*Conditioneel gerenderde random movie. >> Wordt getoond als LoadingBar geladen is   */}
                {loadingComplete && shortlist.length > 0 &&
                    <MovieCard
                        movie={randomMovie}
                        withIcons={false}
                    />
                }
                
                
                {shortlist.length > 1 &&
                    <Button
                        type='button'
                        text='Get random movie'
                        handleClick={handleClick}
                        disabled={false}
                    >
                    
                    
                    </Button>
                }
                
                {Object.keys( randomMovie ).length > 0 && (
                    <>
                        <h2>Random Movie</h2>
                        <MovieCard
                            movie={randomMovie}
                            withIcons={true}
                        />
                    </>
                )
                }
                
                {Object.keys( shortlist ).length === 0 ? (
                    <>
                        <p>No movies in shortlist</p>
                        <p>Go to <Link to='/'>MovieSearch</Link></p>
                    </>
                ) : Object.keys( shortlist ).length === 1 ? (
                    <>
                        <p>Just one movie in shortlist. Add more in MovieSearch in order to Randomize</p>
                        <p>Go to <Link to='/'>MovieSearch</Link></p>
                    </>
                ) : (
                    <>
                        <p>Want to add more movies to the shortlist?</p>
                        <p>Go to <Link to='/'>MovieSearch</Link></p>
                    </>
                )}
            
            </div>
        </>
    );
    
}


export default Randomizer;

