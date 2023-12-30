import React, { useContext, useId } from 'react';
import './ShortList.css';
import Button from '../button/Button.jsx';
import { useNavigate } from 'react-router-dom';

import { ShortlistContext } from "../../context/ShortlistContext.jsx";


function Shortlist( { linkToRandomizePage } ) {
    const idPrefix = useId();
    
    const {
        shortlist, setMovies, clearShortlistAndLocalStorageShortlist, handleRemoveFromShortlist
    } = useContext( ShortlistContext );
    
    const navigate = useNavigate();
    
    
    function handleClickRandomize( e ) {
        e.preventDefault();
        navigate( '/randomizer' );
    }
    
    
    return (
        <>
            <h2 className='section-title'>Shortlist</h2>
            <h4 className='shortlist-counter'>{shortlist.length}/10</h4>
            <section className='shortlist-movies'>
                {shortlist.length > 0 ? (
                        shortlist.map( ( movie ) => (
                            <div
                                key={`${idPrefix}-${movie.id}`}
                                className='shortlist-movie'
                            >
                                <button
                                    className='button-remove-movie'
                                    onClick={() => handleRemoveFromShortlist( movie, setMovies )}
                                >
                                    -
                                </button>
                                <p>
                                    {movie.title}
                                </p>
                            </div>
                        ) ) )
                    :
                    <i className='shortlist-empty-text'> - Empty - </i>
                }
            </section>
            <div className='shortlist-randomize-and-clear-container'>
                {linkToRandomizePage &&
                    <Button
                        type='button'
                        text='Randomize'
                        handleClick={handleClickRandomize}
                        disabled={false}
                    />
                }
                
                
                <Button
                    type='button'
                    text='Clear Shortlist'
                    handleClick={clearShortlistAndLocalStorageShortlist}
                    disabled={false}
                />
            </div>
        
        </>
    );
}

export default Shortlist;
