import React, { useContext } from 'react';
import './ShortList.css'
import Button from './../button/Button';
import { useNavigate } from 'react-router-dom';

import {ShortlistContext} from "../../context/ShortlistContext";
import textEllipsis from "../../helpers/textEllipsis";

function Shortlist({handleRemoveFromShortlist}) {
    const { shortlist, clearShortlistAndLocalStorageShortlist } = useContext(ShortlistContext);
    
    const navigate = useNavigate();
    
    function handleClick() {
        navigate('/wheel');
    }
    
    function handleClickRandomize(e) {
        e.preventDefault()
        navigate('/wheel')
    }
    
    
    return (
    <>
        <h2 className='section-title'>Shortlist</h2>
        <h4 className='shortlist-counter'>{shortlist.length}/10</h4>
        <section className='shortlist-movies'>
            {shortlist.length > 0 ? (
            shortlist.map((movie) => (
            <div key={movie.id} className='shortlist-movie'>
                <button className='button-remove-movie' onClick={() => handleRemoveFromShortlist(movie)}>
                    -
                </button>
                <p>
                    {textEllipsis(movie.title, 37) }
                </p>
            </div>
            )))
            :
            <i className='shortlist-empty-text'> - Empty - </i>
            }
        </section>
        <div className='shortlist-randomize-and-clear-container'>
            <Button text="Randomize" handleClick={handleClickRandomize} disabled={false}/>
            <Button text="Clear Shortlist" handleClick={clearShortlistAndLocalStorageShortlist} disabled={false} />
        </div>
        
    </>
    );
}

export default Shortlist;
