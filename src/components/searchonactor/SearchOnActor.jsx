import React from 'react';
import Button from '../button/Button.jsx';


function SearchOnActor( { handleActorSubmit, actorName, setActorName, errorActor, errorFetch } ) {
    
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
            {errorFetch === 'error actor' &&
                <p className='error-message'>Error retrieving data. Please try again</p>}
            {errorActor &&
                <p className='error-message'>{errorActor}</p>}
        </>
    );
}

export default SearchOnActor;