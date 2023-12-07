import { useEffect, useState, useContext } from 'react';
import { ShortlistContext } from '../../context/ShortlistContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

import './LoadingBar.css';

// TODO: button ook uit LoadingBar halen. Button moet showRandomMovie op false zetten en op loadingComplete weer op true

function LoadingBar( { onLoadingComplete } ) {
    
    // console.log( 'startLoading: ', startLoading );
    // console.log( 'afterLoadingCue: ', afterLoadingCue );
    
    const navigate = useNavigate();
    
    const [ progress, setProgress ] = useState( 0 );
    const [ startLoading, setStartLoading ] = useState( false );
    
    
    useEffect( () => {
        let loop;
        
        if ( startLoading ) {
            // resetting states
            setStartLoading( false );
            setProgress( 0 );
            
            let loop = setInterval( () => {
                setProgress( oldProgress => {
                    if ( oldProgress === 100 ) {
                        // geeft terug dat LoadingBar klaar is met laden
                        onLoadingComplete();
                        
                        
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
            // console.log( "Het interval wordt gestopt!" );
            clearInterval( loop );
        };
    }, [ startLoading ] );
    
    return (
      <>
          {/* TODO: in CSS zetten LoadingBar Styling */}
          <div style={{ width: '100%', backgroundColor: '#ddd' }}>
              <div style={{ width: `${progress}%`, backgroundColor: 'blue', height: '10px' }}/>
          </div>
          
          {/*  disabled={Object.keys( shortlist ).length === 0}  */}
          <button className='btn-toggle' type='button' onClick={() => setStartLoading( !startLoading )}>setStartLoading
          </button>
      
      </>
    );
}

export default LoadingBar;