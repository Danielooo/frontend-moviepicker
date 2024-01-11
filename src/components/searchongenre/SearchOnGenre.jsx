import Button from '../button/Button.jsx';
import React from 'react';


function SearchOnGenre(
    { genreAndIdListOfApi, errorGenreList, errorGenre, handleGenreSubmit, genreChoice, setGenreChoice, errorFetch } ) {
    
    
    return (
        <>
            {genreAndIdListOfApi.length > 0 && !errorGenreList && (
                <>
                    {/*component*/}
                    <form
                        className='section-form'
                        onSubmit={handleGenreSubmit}
                    >
                        <div className='section-input-line'>
                            <label htmlFor='genreInput'>Genre:</label>
                            <select
                                className='section-input-field'
                                id='genreInput'
                                value={genreChoice}
                                onChange={( e ) => setGenreChoice( e.target.value )}
                            >
                                
                                {genreAndIdListOfApi.map( ( genre ) => (
                                    <option
                                        key={genre.id}
                                        value={genre.name}
                                    >
                                        {genre.name}
                                    </option>
                                ) )}
                            </select>
                        </div>
                        <Button
                            type='submit'
                            text='Search Genre'
                            disabled={false}
                        />
                    
                    </form>
                    {errorFetch === 'error genre' &&
                        <p className='error-message'>Error retrieving data. Please try again</p>}
                    {errorGenre && <p className='error-message'>An error occurred. Please try again</p>}
                
                </>
            )
            }
            
            {errorGenreList &&
                <p>An error occurred during fetching the genre options. Please refresh the page.</p>
            }
        
        </>
    );
}

export default SearchOnGenre;