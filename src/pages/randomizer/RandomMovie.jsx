import React, { useContext, useEffect, useState } from 'react';
import Randomizer from '../../components/randomizer/Randomizer.jsx';
import Shortlist from '../../components/shortlist/ShortList.jsx';
import LoadingBar from '../../components/loadingBar/LoadingBar.jsx';
import MovieCard from '../../components/moviecard/MovieCard.jsx';
import getRandomInt from '../../helpers/getRandomInt.js';
import { Link } from 'react-router-dom';
import { ShortlistContext } from '../../context/ShortlistContext.jsx';

// TODO: Maak state waarvan setter meegegeven wordt aan LoadingBar. >> LoadingBar verandert state nadat bar klaar is

function RandomMovie() {
    const { shortlist } = useContext( ShortlistContext );
    
    
    const [ showRandomMovie, toggleShowRandomMovie ] = useState( false );
    // const showRandomMovieState = { showRandomMovie: showRandomMovie, toggleShowRandomMovie: toggleShowRandomMovie };
    
    const [ loadingComplete, setLoadingComplete ] = useState( false );
    
    // console.log( 'loadingComplete: ', loadingComplete );
    
    useEffect( () => {
        console.log( 'useEffect loadingComplete: ', loadingComplete );
    }, [ loadingComplete ] );
    
    return (
      <>
          <div>
              <h1 className='login-title'>Randomizer</h1>
              {/*  Schrijf een randomizer component  */}
              <Shortlist linkToRandomizePage={false}/>
          </div>
          
          {/*  Start een laadbalk en zet daarna afterLoadingCue naar true */}
          <LoadingBar onLoadingComplete={() => setLoadingComplete( true )}/>
          
          <div>
              {/*   Conditioneel gerenderde random movie. >> Wordt getoond als LoadingBar geladen is   */}
              {loadingComplete && shortlist.length > 0 &&
                <MovieCard movie={shortlist[ getRandomInt( 0, Object.keys( shortlist ).length ) ]}/>
              }
              {console.log( 'loadingComplete: ', loadingComplete )}
              
              {/*{Object.keys( shortlist ).length === 0 &&*/}
              {/*  <>*/}
              {/*      <p>No movies in shortlist</p>*/}
              {/*      <p>Go to <Link to='/'>MovieSearch</Link></p>*/}
              {/*  </>*/}
              {/*}*/}
          </div>
      
      </>
    );
    
}


export default RandomMovie;

