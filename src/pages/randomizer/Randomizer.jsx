import React, { useContext, useEffect, useState } from 'react';
import Shortlist from '../../components/shortlist/ShortList.jsx';
import LoadingBar from '../../components/loadingBar/LoadingBar.jsx';
import MovieCard from '../../components/moviecard/MovieCard.jsx';
import getRandomInt from '../../helpers/getRandomInt.js';
import { Link } from 'react-router-dom';
import { ShortlistContext } from '../../context/ShortlistContext.jsx';
import './Randomizer.css';

// TODO: 2. verwijderen movie uit shortlist > random movie naar default
// TODO: 3. button opmaken
// TODO: 4. opmaken loadingbar > div met margin en


function Randomizer() {
    const { shortlist } = useContext( ShortlistContext );
    
    const [ randomMovie, setRandomMovie ] = useState( {} );
    const [ loadingComplete, toggleLoadingComplete ] = useState( false );
    
    
    // function handleClick() {
    //     setRandomMovie( shortlist[ getRandomInt( 0, Object.keys( shortlist ).length ) ] );
    // }
    
    
    return (
        <>
            <div>
                <h1 className='login-title'>Randomizer</h1>
                
                <section className='section-container section-set-width'>
                    <Shortlist linkToRandomizePage={false}/>
                </section>
            </div>
            
            {/*Na laden conditioneel renderen met loadingComplete */}
            <LoadingBar
                boolComplete={toggleLoadingComplete}
            />
            
            <div className='random-movie-container'>
                {/*Conditioneel gerenderde random movie. >> Wordt getoond als LoadingBar geladen is   */}
                {loadingComplete && shortlist.length > 0 &&
                    <MovieCard
                        movie={randomMovie}
                        withIcons={false}
                    />
                }
                
                {/*<button*/}
                {/*    type='button'*/}
                {/*    onClick={handleClick}*/}
                {/*>Test*/}
                {/*</button>*/}
                
                {/*{Object.keys( randomMovie ).length > 0 &&*/}
                {/*    <MovieCard*/}
                {/*        movie={randomMovie}*/}
                {/*        withIcons={false}*/}
                {/*    />*/}
                {/*}*/}
                
                
                {Object.keys( shortlist ).length === 0 &&
                    <>
                        <p>No movies in shortlist</p>
                        <p>Go to <Link to='/'>MovieSearch</Link></p>
                    </>
                }
            </div>
        </>
    );
    
}


export default Randomizer;

