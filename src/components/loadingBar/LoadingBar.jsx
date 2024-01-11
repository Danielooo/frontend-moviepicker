import { useEffect, useState, useContext } from 'react';
import { ShortlistContext } from '../../context/ShortlistContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

import styles from './LoadingBar.module.css';


function LoadingBar( { boolComplete } ) {
    
    const [ progress, setProgress ] = useState( 0 );
    const [ startLoading, setStartLoading ] = useState( false );
    
    function clickHandler() {
        setStartLoading( !startLoading );
        boolComplete( false );
    }
    
    useEffect( () => {
        let loop;
        
        if ( startLoading ) {
            // resetting states
            setStartLoading( false );
            setProgress( 0 );
            
            let loop = setInterval( () => {
                setProgress( oldProgress => {
                    if ( oldProgress === 100 ) {
                        clearInterval( loop );
                        boolComplete( true );
                        return 100;
                    } else {
                        // Laadsnelheid van de laadbalk
                        return Math.min( oldProgress + 0.5 );
                    }
                } );
                
            }, 10 );
        }
        
        return function cleanup() {
            clearInterval( loop );
        };
    }, [ startLoading, boolComplete ] );
    
    
    return (
        <>
            <div style={{ width: '100%', backgroundColor: '#ddd' }}>
                <div style={{ width: `${progress}%`, backgroundColor: 'blue', height: '10px' }}/>
            </div>
            
            {/*disabled={Object.keys( shortlist ).length === 0}  */}
            <button
                className='btn-toggle'
                type='button'
                onClick={clickHandler}
            >Random Movie
            </button>
        
        </>
    );
}

export default LoadingBar;