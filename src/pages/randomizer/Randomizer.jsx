import React, { useContext, useEffect, useState } from 'react';
import Shortlist from '../../components/shortlist/ShortList.jsx';
import LoadingBar from '../../components/loadingBar/LoadingBar.jsx';
import MovieCard from '../../components/moviecard/MovieCard.jsx';
import getRandomInt from '../../helpers/getRandomInt.js';
import { Link } from 'react-router-dom';
import { ShortlistContext } from '../../context/ShortlistContext.jsx';
import ShortList from '../../components/shortlist/ShortList.jsx';

// TODO: Maak state waarvan setter meegegeven wordt aan LoadingBar. >> LoadingBar verandert state nadat bar klaar is

function Randomizer() {
    const { shortlist } = useContext( ShortlistContext );
    
    
    const [ showRandomMovie, toggleShowRandomMovie ] = useState( false );
    // const showRandomMovieState = { showRandomMovie: showRandomMovie, toggleShowRandomMovie: toggleShowRandomMovie };
    
    const [ loadingComplete, setLoadingComplete ] = useState( false );
    
    // console.log( 'loadingComplete: ', loadingComplete );
    
    
    return (
      <>
          <div>
              <h1 className='login-title'>Randomizer</h1>
              
              <section className='section-container section-set-width'>
                  <Shortlist linkToRandomizePage={false}/>
              </section>
          </div>
          
          {/* Moet na laden random movie conditioneel kunnen renderen */}
          <LoadingBar loadingComplete={loadingComplete} boolComplete={setLoadingComplete}/>
          
          <div>
              {/*   Conditioneel gerenderde random movie. >> Wordt getoond als LoadingBar geladen is   */}
              {loadingComplete && shortlist.length > 0 &&
                <MovieCard movie={shortlist[ getRandomInt( 0, Object.keys( shortlist ).length ) ]} withIcons={false}/>
                  // :
                  // <MovieCard movie={shortlist[ getRandomInt( 0, Object.keys( shortlist ).length ) ]}/>
                  
              }
              
              {/*{console.log( 'loadingComplete: ', loadingComplete )}*/}
              
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

