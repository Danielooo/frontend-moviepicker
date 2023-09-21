import React, { useContext } from 'react';
import './ShortList.css'
import Button from './../button/Button';
import { useNavigate } from 'react-router-dom';

import {ShortlistContext} from "../../context/ShortlistContext";

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
        <section className='shortlist-movies'>
            {shortlist.length > 0 ? (
            shortlist.map((movie) => (
            <div key={movie.id} className='shortlist-movie'>
                <button onClick={() => handleRemoveFromShortlist(movie)}>
                    -
                </button>
                <p>
                    {movie.title}
                </p>
            </div>
            )))
            :
            <i className='shortlist-empty-text'> - Empty - </i>
            }
        </section>
        <Button text="Randomize" handleClick={handleClickRandomize} disabled={false}/>
        <Button text="Clear Shortlist" handleClick={clearShortlistAndLocalStorageShortlist} disabled={false} />
        
    </>
    );
}

export default Shortlist;
