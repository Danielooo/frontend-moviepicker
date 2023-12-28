import React, { useContext, useEffect, useState } from 'react';
import Shortlist from '../../components/shortlist/ShortList.jsx';
import LoadingBar from '../../components/loadingBar/LoadingBar.jsx';
import MovieCard from '../../components/moviecard/MovieCard.jsx';
import getRandomInt from '../../helpers/getRandomInt.js';
import { Link } from 'react-router-dom';
import { ShortlistContext } from '../../context/ShortlistContext.jsx';
import './Randomizer.css';


function Randomizer() {
    const { shortlist } = useContext( ShortlistContext );
    
    const [ randomMovieDefault, toggleRandomMovieDefault ] = useState( true );
    const [ loadingComplete, toggleLoadingComplete ] = useState( false );
    
    
    // Fixes when chosen movie is removed from shortlist
    // On shortlist change resets random movie to default
    
    
    // TODO: 2. verwijderen movie uit shortlist > random movie naar default
    // TODO: 3. button opmaken
    // TODO: 4. opmaken loadingbar > div met margin en
    
    return (
        <>
            <div>
                <h1 className='login-title'>Randomizer</h1>
                
                <section className='section-container section-set-width'>
                    <Shortlist linkToRandomizePage={false}/>
                </section>
            </div>
            
            {/* Moet na laden random movie conditioneel kunnen renderen */}
            <LoadingBar
                loadingComplete={loadingComplete}
                boolComplete={toggleLoadingComplete}
            />
            
            <div className='random-movie-container'>
                {/*   Conditioneel gerenderde random movie. >> Wordt getoond als LoadingBar geladen is   */}
                {/*   idea: loadingComplete to false when current movie is removed */}
                {loadingComplete && shortlist.length > 0 &&
                    <MovieCard
                        movie={shortlist[ getRandomInt( 0, Object.keys( shortlist ).length ) ]}
                        withIcons={false}
                    />
                    
                    
                }
                
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

