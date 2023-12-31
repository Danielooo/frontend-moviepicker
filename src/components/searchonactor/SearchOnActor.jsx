import React from 'react';
import Button from '../button/Button.jsx';


function SearchOnActor( { handleActorSubmit, actorName, setActorName, errorActor } ) {
    
    return (
        <>
            <form
                className='section-form'
                onSubmit={handleActorSubmit}
            >
                
                <div className='section-input-line'>
                    <label htmlFor='actorNameInput'>Actor/Actress:</label>
                    <input
                        className='section-input-field'
                        placeholder='name of actor/actress'
                        type='text'
                        id='actorNameInput'
                        value={actorName}
                        onChange={( e ) => setActorName( e.target.value )}
                    />
                </div>
                
                <Button
                    type='submit'
                    text='Search Actor'
                    disabled={false}
                />
            
            </form>
            {errorActor &&
                <p className='error-message'>Actor is misspelled or not in database. Please check your entry. </p>}
        </>
    );
}

export default SearchOnActor;