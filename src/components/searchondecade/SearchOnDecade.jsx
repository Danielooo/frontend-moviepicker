import Button from '../button/Button.jsx';
import React from 'react';


function SearchOnDecade( { handleDecadeSubmit, selectedDecade, setSelectedDecade, decades, errorDecade, errorFetch } ) {
    
    return (
        <>
            <form
                className='section-form'
                onSubmit={handleDecadeSubmit}
            >
                <div className='section-input-line'>
                    <label className='decadeInput'>Decade: </label>
                    <select
                        className='section-input-field'
                        id='DecadeInput'
                        value={selectedDecade}
                        onChange={( e ) => setSelectedDecade( e.target.value )}
                    >
                        {decades.map( ( decade ) => (
                            <option
                                key={decade}
                                value={decade}
                            >
                                {decade}
                            </option>
                        ) )}
                    </select>
                </div>
                <Button
                    type='submit'
                    text='Search Decade'
                    disabled={false}
                />
            </form>
            {errorFetch === 'error decade' &&
                <p className='error-message'>Error retrieving data. Please try again</p>}
            {errorDecade && <p className='error-message'>An error occurred. Please try again</p>}
        </>
    
    );
}

export default SearchOnDecade;