import React from 'react';
import Button from '../button/Button.jsx';


function SearchOnTitle( { handleTitleSubmit, title, setTitle, errorTitle, errorFetch } ) {
    
    return (
        <>
            <form
                className='section-form'
                onSubmit={handleTitleSubmit}
            >
                
                <div className='section-input-line'>
                    <label htmlFor='titleInput'>Movie Title</label>
                    <input
                        className='section-input-field'
                        placeholder='title of movie'
                        type='text'
                        id='titleInput'
                        value={title}
                        onChange={( e ) => setTitle( e.target.value )}
                    />
                </div>
                <Button
                    type='submit'
                    text='Search Title'
                    disabled={false}
                />
            
            </form>
            {errorFetch === 'title error' &&
                <p className='error-message'>Error retrieving data. Please try again</p>}
            {errorTitle &&
                <p className='error-message'>Title is misspelled or not in database. Please check your entry. </p>}
        </>
    );
}

export default SearchOnTitle;