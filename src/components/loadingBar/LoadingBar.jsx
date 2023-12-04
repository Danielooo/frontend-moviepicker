import { useEffect, useState, useContext } from 'react';
import { ShortlistContext } from '../../context/ShortlistContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

import './LoadingBar.css';

// TODO: fix Uncaught TypeError: Cannot read properties of undefined (reading 'poster_path')


function LoadingBar( { startLoading, toggleStartLoading, afterLoadingCue, toggleAfterLoadingCue } ) {
    
    console.log( 'startLoading: ', startLoading );
    console.log( 'afterLoadingCue: ', afterLoadingCue );
    
    const navigate = useNavigate();
    
    const [ progress, setProgress ] = useState( 0 );
    
    
    useEffect( () => {
        let loop;
        
        if ( startLoading ) {
            // resetting states
            toggleStartLoading( false );
            toggleAfterLoadingCue( false );
            
            setProgress( 0 );
            
            const loop = setInterval( () => {
                setProgress( oldProgress => {
                    if ( oldProgress === 100 ) {
                        // voor conditioneel renderen movie
                        
                        toggleAfterLoadingCue( true ); // << HIER KRIJG IK DE FOUTMELDING OP
                        
                        
                        clearInterval( loop );
                        // console.log( 'interval is gestopt' );
                        return 100;
                    } else {
                        // Laadsnelheid van de laadbalk
                        return Math.min( oldProgress + 0.5 );
                    }
                    
                } );
            }, 10 );
        }
        
        
        return function cleanup() {
            console.log( "Het interval wordt gestopt!" );
            clearInterval( loop );
        };
    }, [ startLoading ] );
    
    return (
      <>
          <div style={{ width: '100%', backgroundColor: '#ddd' }}>
              <div style={{ width: `${progress}%`, backgroundColor: 'blue', height: '10px' }}/>
          </div>
          
          {/*  disabled={Object.keys( shortlist ).length === 0}  */}
          <button className='btn-toggle' type='button' onClick={() => toggleStartLoading( !startLoading )}>toggleLoading
          </button>
      
      </>
    );
}

export default LoadingBar;